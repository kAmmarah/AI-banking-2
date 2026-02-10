import React from 'react';
import { Box, Typography, Divider, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const StyledFooter = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(3, 4),
  backgroundColor: 'rgba(10, 25, 41, 0.95)',
  borderRadius: '20px',
  border: '1px solid rgba(64, 224, 255, 0.3)',
  backdropFilter: 'blur(20px)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(0, 0.5),
  color: '#b0b0b0',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '50%',
  width: 40,
  height: 40,
  transition: 'all 0.3s ease',
  '&:hover': {
    color: '#40e0ff',
    borderColor: '#40e0ff',
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 15px rgba(64, 224, 255, 0.4)',
  },
}));

const Footer: React.FC = () => {
  return (
    <>
      <Divider sx={{ 
        mt: 6, 
        mb: 3, 
        borderColor: 'rgba(64, 224, 255, 0.3)',
        width: '90%',
        mx: 'auto',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, #40e0ff, transparent)',
      }} />
      <StyledFooter>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#40e0ff',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #40e0ff 0%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              whiteSpace: 'nowrap',
            }}
          >
            Ammara Dawood
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#e0e0e0',
              lineHeight: 1.4,
              maxWidth: '300px',
            }}
          >
            AI Banking Fraud Detection System
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SocialIcon aria-label="Instagram">
            <InstagramIcon />
          </SocialIcon>
          
          <SocialIcon aria-label="Facebook">
            <FacebookIcon />
          </SocialIcon>
          
          <SocialIcon aria-label="LinkedIn">
            <LinkedInIcon />
          </SocialIcon>
          
          <SocialIcon aria-label="WhatsApp">
            <WhatsAppIcon />
          </SocialIcon>
        </Box>
        
        <Typography 
          variant="caption" 
          sx={{ 
            color: '#888',
            whiteSpace: 'nowrap',
          }}
        >
          © 2026 Ammara Dawood. All rights reserved.
        </Typography>
      </StyledFooter>
    </>
  );
};

export default Footer;