import "./WelcomeMessage.css";
function WelcomeMessage() {
  return (
    <>
      <center className="welcome-messages">
        <section className="chat-welcome">
          <article className="welcome-content">
            <h1 className="welcome-heading">Welcome to Personal Chat</h1>
            <h2 className="subheading">
              Chat seamlessly and securely with your friends, colleagues, or
              anyone across the globe.
            </h2>
            <blockquote className="chat-highlight">
              Conversations that matter. Private, real-time, and just between
              you and them.
            </blockquote>

            <h1 className="closing-message">
              Messaging made personal. Talk freely, talk securely.
            </h1>
          </article>
        </section>
      </center>
    </>
  );
}
export default WelcomeMessage;
