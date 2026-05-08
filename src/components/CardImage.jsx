import { useEffect, useState } from "react"
import { getCardImage } from "../api/api"

const CardImage = ({ cardId, cardName }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let localURL;
    let isMounted = true; // Track if the component is still around

    const fetchImage = async () => {
      try {
        const blob = await getCardImage(cardId);
        if (isMounted) { // Only update state and create URL if still mounted
          localURL = URL.createObjectURL(blob); // This is *completely* foreign to me
          setImageSrc(localURL);
        }
      } catch (err) {
        if (isMounted) setError(err);
      }
    };

    fetchImage();

    // Important cleanup function to prevent memory leaks!
    return () => {
      isMounted = false; // Mark as unmounted
      if (localURL) URL.revokeObjectURL(localURL); // This feels like the clearTimeout to setTimeout haha
    };
  }, [cardId]);

  if (error) return <p>No image available</p>;

  return (
    <div>
      {imageSrc ? (
        <img className="card-image" src={imageSrc} alt={cardName} />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  )
}

export default CardImage