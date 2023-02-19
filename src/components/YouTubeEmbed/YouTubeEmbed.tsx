import PropTypes from 'prop-types'

function YouTubeEmbed({ embedId }: { embedId: string }) {
  return (
    <div className='video-responsive'>
      <iframe
        src={`https://www.youtube.com/embed?autoplay=1&enablejsapi=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${embedId}`}
        title='YouTube video player'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      ></iframe>
    </div>
  )
}

YouTubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
}

export default YouTubeEmbed
