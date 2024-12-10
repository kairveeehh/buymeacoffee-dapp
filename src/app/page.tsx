import { ConnectEmbed } from "./thirdweb";
import { client } from "./client";
import { chain } from "./chain";
import { BMC } from "../../components/bmc";

export default function Home() {
  return (
    <>
      <div
        style={{
          padding: "2rem",
          backgroundColor: "#f3f4f6",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#1f2937",
            fontSize: "3rem",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "bold",
            padding: "1rem",
       
            maxWidth: "500px",
          
          }}
        >
          Juice pila do .. 
        </h1>
        <p> mosambi ka </p>
        <div
          style={{
            marginBottom: "2rem",
            marginTop: "2rem",
            width: "100%",
            maxWidth: "500px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ConnectEmbed client={client} chain={chain}   />
        </div>
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <BMC />
        </div>
      </div>
    </>
  );
}
