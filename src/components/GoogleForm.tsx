export const GoogleForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <iframe 
        src="https://docs.google.com/forms/d/e/1FAIpQLSffoL4Kmh-_vEbqW8Oxw9UqOJgyWVVcU6RyoFk-7v_smJd41Q/viewform?embedded=true" 
        width="100%" 
        height="800px" 
        className="max-w-4xl w-full"
        frameBorder="0" 
        marginHeight="0" 
        marginWidth="0"
      >
        Loading…
      </iframe>
    </div>
  );
};