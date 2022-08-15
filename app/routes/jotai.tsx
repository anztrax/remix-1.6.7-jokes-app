import JotaiContainer from "~/components/jotai/JotaiContainer";
import { LinksFunction } from "@remix-run/node";
import stylesUrl from "~/styles/jotai.css";


export const links: LinksFunction = () => {
  return [
    {rel: 'stylesheet', href: stylesUrl }
  ];
}

export default function JotaiRoute(){
  return (
    <div>
      <h1>Jotai Container</h1>
      <JotaiContainer />
    </div>
  );
}
