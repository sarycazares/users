'use client'
import { User } from '@/models/User'
import { createUser, getUsers } from '@/services/User'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

export default function RegisterPage() {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const data: User = {
                name: name,
                email: email,
                password: password
            }
            await createUser(data)
            router.push('/login')
        } catch (error: any) {
            setMsg(error.message)
        }
    }

    return (
        <Box width="100%" px={10} py={5}>
            <Snackbar open={msg != ''} autoHideDuration={6000} onClose={() => setMsg('')} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert severity='error' onClose={() => setMsg('')}>{msg}</Alert>
            </Snackbar>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Registrarse
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={(e) => setName(e.currentTarget.value)}
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Nombre"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Correo electrónico"
                                    name="email"
                                    onChange={(e) => setEmail(e.currentTarget.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Contraseña"
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPassword(e.currentTarget.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: 'black !important' }}
                        >
                            Registrarme
                        </Button>
                        <Stack display='flex' justifyContent='center' alignItems='center'>
                            <Link href='/login'>
                                ¿Ya tienes cuenta? Inicia sesión c:
                            </Link>
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </Box >
    )
}
