import { useState } from "react";

import AppBanner from '../appBanner/AppBanner';
import ComicsList from "../comicsList/ComicsList";

const ComicsPage = () => {

  const [ , setSelectedComics] = useState(null)
  
  const onComicsSelected = (id) => {
    setSelectedComics(id)
  }

  return(
  <> 
    <AppBanner/>
    <ComicsList onComicsSelected = {onComicsSelected}/>
  </>
  )
}

export default ComicsPage