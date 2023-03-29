import React from 'react';
import { useState } from 'react';

function AllCollectionCard({ collection }) {

    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgError, setImgError] = useState(false);
    return (
        <div className="recipeCardDiv">
            {
                !imgLoaded &&
                <div className="allRecipeCardImage-overlay">
                    <img className='Loading-Image' src="https://media.istockphoto.com/id/1335247217/vector/loading-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=jARr4Alv-d5U3bCa8eixuX2593e1rDiiWnvJLgHCkQM=" />
                </div>
            }
            <img className="recipeCardImg"
                alt="loading"
                src={(!imgError) ? collection.imageUrl : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"}
                onLoad={() => { setImgLoaded(true) }}
                onError={() => { setImgError(true) }}
                style={imgLoaded ? { display: "block" } : { display: "none" }} />
            <div className="textContainerCollection">
                <div className="numberIcon">{collection.recipeNumber}</div>
                <div className="collectionCardTextDivUpper">
                    <div className="cardTextTitle">{collection.name}</div>
                    <div className="cardTextAuthor">{collection.author.username}</div>

                </div>
                <div className="collectionCardTextDivLower">
                    <div className="cardTextTime">{collection.recipeNumber} recipes</div>
                </div>
            </div>
        </div>
    )
}

export default AllCollectionCard
