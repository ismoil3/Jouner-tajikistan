import { Box, Button, Link, TextField, Typography } from '@mui/material'
import React from 'react'
import Container from '../../components/container/Container'
import { styled } from '@mui/system';
const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
      borderRadius: '25px',
      '& fieldset': {
        borderColor: '#000',
      },
      '&:hover fieldset': {
        borderColor: '#000',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#000',
      },
    },
    '& .MuiOutlinedInput-input': {
      color: '#000', 
      '&::placeholder': {
        color: '#000', 
      },
    },
    '& .MuiInputLabel-root': {
      color: '#000', 
    },
    '& .Mui-focused .MuiInputLabel-root': {
      color: '#000', 
    },
  });
  
  
export const LogInSingUp = () => {
  return (
    <Container>
        <Box sx={{borderRadius:"20px",padding:"20px",backgroundImage:"url('/src/images/image.png')",height:"97vh",backgroundSize:"cover",backgroundPosition:"center"}}>

            <Box
      sx={{
        display: 'flex',
        position:'relative',
        top:'50%',
        transform:'translateY(-50%)',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '340px',
        margin: 'auto',
        paddingTop: '50px',
        padding:"20px",
        borderRadius:"5px",
        background:"#ffffff50",
        backdropFilter:'blur(2px)'
      }}
    >
        <Typography
              variant="h5"
              sx={{
                fontWeight: '700',
                background: 'linear-gradient(90deg, #00c6ff, #0072ff)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                textAlign:"center",
                fontFamily: "'Poppins', sans-serif",
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)',
              }}
            >
              Journey TJ
            </Typography>
      <CustomTextField 
        label="Enter Email" 
        variant="outlined" 
        fullWidth 
      />
      <CustomTextField 
        label="Enter Password" 
        variant="outlined" 
        type="password" 
        fullWidth 
        sx={{marginTop:"15px"}}
      />
      <Link sx={{textAlign:"center"}} component="a" href='https://t.me/ismoilSufonkulzoda'>Forgot password</Link>
      <Button sx={{backgroundColor:"blue",color:"white",borderRadius:"20px",padding:"10px 5px"}}>Login</Button><br />
    </Box>

        </Box>
    </Container>
  )
}
