import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

const CharList = (props) => {

  const {loading,error,getAllCharacters} = useMarvelService();
  
  const [charList , setCharList] = useState([])
  const [newItemsLoading , setNewItemsLoading] = useState(false)
  const [offset , setOffset] = useState(200)


  useEffect(() => {
    onRequest(offset,true)
  }, [])

  const onRequest = (offset,initial) =>{
    initial ? setNewItemsLoading(false):setNewItemsLoading(true)
    onCharListLoading()
    getAllCharacters(offset)
    .then(onCharListLoaded)

  }

  const onCharListLoading = () => {
    setNewItemsLoading(true)
  }

  const onCharListLoaded = (newCharList) => {
    setCharList([...charList, ...newCharList])
    setNewItemsLoading(false)
    setOffset(offset + 9)
  }


  const renderItems = (arr) => {
    const items = arr.map((item) => {
      let imgStyle = {'objectFit' : 'cover'};
       if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {'objectFit' : 'unset'};
        }
        return(
          <li 
            className="char__item"
            key={item.id}
            onClick={
              () => props.onCharSelected(item.id)
            }>
                <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                <div className="char__name">{item.name}</div>
          </li>
        )

        
    })
    
    return (
      <ul className="char__grid">
          {items}
      </ul>
    )
  }

        
  const items = renderItems(charList);

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading && !newItemsLoading ? <Spinner/> : null;


  return (
      <div className="char__list">
          {errorMessage}
          {spinner}
          {items}
          <button 
          onClick={() => onRequest(offset)} 
          className="button button__main button__long"
          disabled={newItemsLoading}
          >
              <div className="inner">load more</div>
          </button>
      </div>
  )
  
}

export default CharList;