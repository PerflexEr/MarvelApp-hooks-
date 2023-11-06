import { useParams , Link} from 'react-router-dom';
import {useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import './singleComic.scss';


const SingleComic = () => {

  const {comicId} = useParams()


  const [comic,setComic] = useState(null)
  
  const {loading,error,getComics,clearError} = useMarvelService()

  useEffect(() =>
    updateComics(),
    [comicId]
  )


  const updateComics = () => {
    getComics(comicId)
    .then(onComicLoaded)
    .catch(clearError)

  }

  const onComicLoaded = (comic) => {
    setComic(comic)
  }



  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

  return (
      <>
        {errorMessage}
        {spinner}
        {content}
      </>
  )
}

const View = ({comic}) => {

  const {title,description,pageCount,thumbnail,price,language} = comic

  return(
    <div className="single-comic">
          <img src={thumbnail} alt={title} className="single-comic__img"/>
          <div className="single-comic__info">
              <h2 className="single-comic__name">{title}</h2>
              <p className="single-comic__descr">{description}</p>
              <p className="single-comic__descr">Pages: {pageCount}</p>
              <p className="single-comic__descr">Language: {language}</p>
              <div className="single-comic__price">Price: {price} $</div>
          </div>
          <Link to="/comics" className="single-comic__back">Back to all</Link>
      </div>
  )
}

export default SingleComic;