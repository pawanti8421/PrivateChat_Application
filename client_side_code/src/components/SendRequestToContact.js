import React from "react";
import "./SendRequestToContact.css";
import { ImWhatsapp } from "react-icons/im";
import { TfiEmail } from "react-icons/tfi";

function SendRequestToContact({ showSendRequest, setShowSendRequest }) {
  const inviteUrl = "https://privatechat-client.onrender.com";
  const shareText = "Join me on PrivateChat to start a conversation!";

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "PrivateChat Invite",
          text: shareText,
          url: inviteUrl,
        });
        setShowSendRequest(false);
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Web Share API not supported. Use buttons below.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteUrl);
    alert("Link copied to clipboard!");
    setShowSendRequest(false);
  };

  return (
    <>
      {showSendRequest && (
        <div
          className="send-request-container"
          onClick={() => setShowSendRequest(false)}
        >
          <div
            className="send-request-card"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="request-heading">User is not on PrivateChat</h2>
            <p className="request-message">
              Invite them to join PrivateChat so you can start a conversation.
            </p>

            <h3>Share via</h3>
            <div className="share-options">
              <button onClick={handleNativeShare} className="share-link native">
                🌐 Native Share
              </button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  shareText + " " + inviteUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-link whatsapp"
              >
                <ImWhatsapp />
              </a>
              <a
                href={`mailto:?subject=Join me on PrivateChat&body=${encodeURIComponent(
                  shareText + " " + inviteUrl
                )}`}
                className="share-link email"
              >
                <TfiEmail />
              </a>

              <button onClick={copyToClipboard} className="share-link copy">
                Copy Link
              </button>
              <button
                onClick={() => setShowSendRequest(false)}
                className="close-btn"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SendRequestToContact;
