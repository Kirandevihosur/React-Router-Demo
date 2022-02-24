import { Fragment } from "react";
import { Route, useParams, Link, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import { useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";


export const QuoteDetail =()=>{
    
    const match = useRouteMatch();
    const params = useParams();

    const {quoteId} = params;

    const {sendRequest, status, data: loadedSingleQuote, error} = useHttp(getSingleQuote,true);




    useEffect(()=>{
        sendRequest(quoteId);
    },[sendRequest, quoteId]);

    if(status === 'pending'){
        return <div className="centered">
            <LoadingSpinner />
        </div>
    }

    if(error){
      return  <p className="centered">{error}</p>
    }


    if(!loadedSingleQuote.text){
        return <p>No Quote Found!</p>
    }

    return(
        <Fragment>
             <HighlightedQuote text={loadedSingleQuote.text} author={loadedSingleQuote.author} />
             <Route path={match.path} exact>
             <div className="centered">
                <Link className='btn--flat' to={`${match.url}/comments`}>Load Comments</Link>
             </div>
             </Route>
            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </Fragment>
    )
};

