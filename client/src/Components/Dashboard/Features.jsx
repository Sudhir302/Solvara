import "../../Styles/Features.css"

function Features(){
    return(
        <section className="features-container" id="features">
            <div className="heading-second">
                <strong>Features</strong>
            </div>
            <div className="features">
                <div className="feature-card">
                    <i className="fa-solid fa-user-group"></i>
                    <div>
                        <strong>Friend System</strong>
                        <p>Add, follow, or message people</p>
                    </div>
                </div>
                <div className="feature-card">
                    <i className="fa-solid fa-pen-to-square"></i>
                    <div>
                        <strong>Post Updates</strong>
                        <p>Share thoughts, photos and videos</p>
                    </div>
                </div>
                <div className="feature-card">
                    <i className="fa-solid fa-comments"></i>
                    <div>
                        <strong>Real-Time Chat</strong>
                        <p>Instant messaging with friends</p>
                    </div>
                </div>
                <div className="feature-card">
                    <i className="fa-solid fa-bell"></i>
                    <div>
                        <strong>Notifications</strong>
                        <p>Stay up to date with activity</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features;