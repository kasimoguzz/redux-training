import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharactersAsync } from "../../redux/charactersSlice";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import {Link} from 'react-router-dom'

import Masonry from "react-masonry-css";
import "./style.css";

function Home() {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters.items);
  const nextPage = useSelector((state) => state.characters.page);
  const hasNextPage = useSelector((state) => state.characters.hasNextPage);
  const status = useSelector((state) => state.characters.status);
  const error = useSelector((state) => state.characters.error);
  
  useEffect(() => {
    if(status === "idle"){
      dispatch(getCharactersAsync());
    }
  }, [dispatch,status]);

  if (error) {
    return (
      <p>
        <Error message={error} />
      </p>
    );
  }

  return (
    <div>
      <Masonry
        breakpointCols={3}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {characters.map((character) => (
          <div key={character.id}>
            <Link to={`/char/${character.id}`}>
            <img
              src={character.image}
              alt={character.name}
              className="char-img"
            />
            <p>{character.name}</p>
            </Link>
          </div>
        ))}
      </Masonry>
      {status === "loading" && (
        <div>
          <Loading />
        </div>
      )}
      {hasNextPage && status !== "loading" && (
        <div style={{ textAlign: "center" }}>
          <button onClick={() => dispatch(getCharactersAsync(nextPage))}>
            load more ({nextPage})
          </button>
        </div>
      )}
      {
        !hasNextPage && <div style={{ textAlign: "center" }}>There is nothing to bo shown</div>
      }
    </div>
  );
}

export default Home;
