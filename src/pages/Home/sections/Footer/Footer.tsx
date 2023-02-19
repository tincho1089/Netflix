import React from 'react'
import './Footer.scss'
import logoFb from '@/assets/social/socialFacebook.png'
import logoYT from '@/assets/social/socialYoutube.png'
import logoTw from '@/assets/social/socialTwitter.png'
import logoIg from '@/assets/social/socialInstagram.png'

const Footer: React.FC = () => {
  const footerItems = [
    'Audio Description',
    'Help Center',
    'Gift Cards',
    'Media Center',
    'Investor Relations',
    'Jobs',
    'Terms of Use',
    'Privacy',
    'Legal Notices',
    'Cookie Preferences',
    'Corporate Information',
    'Contact Us',
  ]

  return (
    <footer className='footer'>
      <div className='footer-container'>
        <div className='footer-social'>
          <img src={logoFb} alt='face' className='footer-social-img white' />
          <img src={logoIg} alt='instag' className='footer-social-img white' />
          <img src={logoTw} alt='twitter' className='footer-social-img white' />
          <img src={logoYT} alt='youtube' className='footer-social-img white' />
        </div>
        <div className='footer-item-container'>
          {footerItems.map((item) => (
            <div className='footer-item' key={item}>
              {item}
            </div>
          ))}
        </div>
        <button className='footer-button-service'>Service Code</button>
        <div className='footer-copy'>
          <p>© 1997-2023 Netflix, Inc.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
