function MediaPreview({preview, setPreview}) {
  return (
    <>
      {/* Modal Preview */}
      {preview && (
        <div className="preview-modal" onClick={() => setPreview(null)}>
          {preview.type === "image" ? (
            <img src={preview.src} alt="preview" className="preview-media" />
          ) : (
            <video controls className="preview-media">
              <source src={preview.src} type="video/mp4" />
            </video>
          )}
        </div>
      )}
    </>
  );
}

export default MediaPreview;
