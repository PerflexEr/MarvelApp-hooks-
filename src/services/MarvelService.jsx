import { useHttp } from "../hooks/http.hook";


const useMarvelService = () =>  {

  const {loading,request,error,clearError} = useHttp()

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
  const _apiKey = 'apikey=cc86c6ba1a2cd1c5b3e6b51ad1acd947';
  const _baseOffset = 100


  const getAllCharacters = async (offset = _baseOffset) => {
      const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
      return res.data.results.map(_transformCharacter);
  }

  const getAllComics = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
    return res.data.results.map(_transformComics);
  }

  const getCharacter = async (id) => {
      const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
      return _transformCharacter(res.data.results[0]);
  } 

  const getComics = async (id) => {
      const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
      return _transformComics(res.data.results[0]);
  }

  const _transformCharacter = (char) => {
      return {
          id: char.id,
          name: char.name,
          description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
          thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
          homepage: char.urls[0].url,
          wiki: char.urls[1].url,
          comics: char.comics.items
      }
  }

  const _transformComics = (comics) => {
      return {
          id: comics.id,
          title: comics.title,
          description: comics.description ? `${comics.description.slice(0, 210)}...` : 'There is no description for this comics',
          thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
          pageCount: comics.pageCount,
          price: comics.prices[0].price,
          language: comics.textObjects[0]?.language || "en-us",
      }
  }

  return {loading , error, getCharacter , getAllCharacters ,clearError ,getAllComics , getComics}
}

export default useMarvelService
