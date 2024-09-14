import Link from "next/link";

export const runtime = "edge";

export default function NotFound() {
  return (
    <>
      <title>404: Page Not Found</title>
      <div style={styles.error}>
        <div>
          <style
            dangerouslySetInnerHTML={{
              __html: `
                body{color:#000;background:#f8f9fa;margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif}
                @media (prefers-color-scheme:dark){body{color:#fff;background:#121212}}
                .pulse {animation: pulse 1.5s infinite;}
                @keyframes pulse {
                  0% {transform: scale(1);}
                  50% {transform: scale(1.05);}
                  100% {transform: scale(1);}
                }`,
            }}
          />
          <h1 className="next-error-h1 pulse" style={styles.h1}>
            404
          </h1>
          <div style={styles.desc}>
            <h2 style={styles.h2}>
              Oops! The page you&apos;re looking for doesn&apos;t exist.
            </h2>
            <p style={styles.message}>
              It looks like you may have taken a wrong turn. Don&apos;t worry,
              it happens to the best of us!
            </p>
            <Link
              href={"/"}
              className="px-4 py-2 bg-slate-200 rounded-md hover:bg-slate-300"
            >
              GO TO HOME
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  error: {
    fontFamily:
      'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
    height: "100vh",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f9fa",
    color: "#343a40",
  },

  desc: {
    display: "inline-block",
    maxWidth: "400px",
  },

  h1: {
    fontSize: "72px",
    fontWeight: 700,
    margin: "0 0 20px",
    padding: "0",
  },

  h2: {
    fontSize: "24px",
    fontWeight: 400,
    marginBottom: "10px",
  },

  message: {
    fontSize: "16px",
    margin: "20px 0",
    color: "#6c757d",
  },

  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },

  buttonHover: {
    backgroundColor: "#0056b3",
  },
} as const;
