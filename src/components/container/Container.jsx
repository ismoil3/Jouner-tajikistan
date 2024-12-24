import { Box } from '@mui/material'

const Container = ({children}) => {
  return (
    <Box sx={{maxWidth: "1440px", padding: {lg:"5px 35px",md:"10px 20px "}, margin: "auto"}}>
        {children}
    </Box>
  )
}

export default Container
