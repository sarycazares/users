'use client'
import { loginUser } from '@/services/Login'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { LoginUser } from '@/models/Login'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const data: LoginUser = {
                email: email,
                password: password
            }
            await loginUser(data)
            router.push('/')
        } catch {
            setMsg('Hubo un error')
        }
    }

    return (
        <Box width="100%">
            <Snackbar open={msg != ''} autoHideDuration={6000} onClose={() => setMsg('')} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert severity="success" onClose={() => setMsg('')}>{msg}</Alert>
            </Snackbar>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Iniciar Sesión
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Correo electrónico"
                                name="email"
                                onChange={(e) => setEmail(e.currentTarget.value)}
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.currentTarget.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, backgroundColor: 'black !important' }}
                            >
                                Iniciar Sesión
                            </Button>
                            <Stack display='flex' justifyContent='center' alignItems='center'>
                                <Link href='/register'>
                                    ¿No tienes cuenta? Regístrate c:
                                </Link>
                            </Stack>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box >
    )
}
