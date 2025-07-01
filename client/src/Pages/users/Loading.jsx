import "../../Styles/Loading.css"

function Loading(){
    return(
        <div className="loading-container">
            <p className="loading-text">NOW LOADING...</p>
            <div className="loading-circles">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
        </div>
    );
}

export default Loading;