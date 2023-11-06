import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import { useState , useEffect} from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import { Link } from 'react-router-dom';


const ComicsList = (props) => {
  
  const {loading,error,getAllComics} = useMarvelService();

  const [comicsList , setComicsList] = useState([])

  const [newItemsLoading , setNewItemsLoading] = useState(false)
  const [offset , setOffset] = useState(200)

  useEffect(() => {
    onRequest(offset,true)
  }, [])

  const onRequest = (offset,initial) =>{
    initial ? setNewItemsLoading(false):setNewItemsLoading(true)
    onComicsListLoading()
    getAllComics(offset)
    .then(onComicsListLoaded)

  }

  const onComicsListLoading = () => {
    setNewItemsLoading(true)
  }

  const onComicsListLoaded = (newComicsList) => {
    setComicsList([...comicsList, ...newComicsList])
    setNewItemsLoading(false)
    setOffset(offset + 9)
  }



  function renderItems (arr) {
    const items = arr.map((item) => {
      return (
        <li className="comics__item" key={item.id}>
          <Link to={`/comics/${item.id}`}>
            <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.price}</div>
          </Link>
        </li>
      )
    })

    return (
      <ul className="comics__grid">
        {items}
      </ul>
    )
  }

  const comics = renderItems(comicsList)
  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading && !newItemsLoading ? <Spinner/> : null;


  return (
      <div className="comics__list">
          {comics}
          {errorMessage}
          {spinner}
          <button  className="button button__main button__long"
            onClick={() => onRequest(offset)} 
            disabled={newItemsLoading}>
            
              <div className="inner">load more</div>
          </button>
      </div>
  )
}

export default ComicsList;