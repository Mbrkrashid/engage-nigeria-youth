export const GoogleForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <iframe 
        src="https://docs.google.com/forms/d/e/1FAIpQLScExQF9XAuS3m1-RmIXYo6ocbV7sE3OKGJvuS_9VRToNdEiYw/viewform?embedded=true" 
        width="100%" 
        height="2064" 
        className="max-w-4xl w-full"
        frameBorder="0" 
        marginHeight={0} 
        marginWidth={0}
      >
        Loading…
      </iframe>
    </div>
  );
};