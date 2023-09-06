import {JSX} from "solid-js";
import SolidMarkdown from "solid-markdown";

export interface CardAttr {
    limit: number;
    id: Number;
    head: String & JSX.Element;
    description: String & JSX.Element;
}

export function Card(Attr: CardAttr){
    return (
        <a href={`/bulletin/${Attr.id}`}
           class={`${Attr.limit > 0 ? "md:max-w-1/5" : "w-full"} flex-grow p-4 m-1 bg-blue-950 text-gray-50 rounded-3xl hover:rounded-sm duration-200`}>
            <h1 class={"font-black text-4xl"}>{Attr.head}</h1>
            <p>{
                Attr.limit > 0 ?
                (Attr.description.length > Attr.limit ?
                    Attr.description.substring(0, Attr.limit) + "..." :
                    <SolidMarkdown children={Attr.description.toString()}/>):
                    <SolidMarkdown children={Attr.description.toString()} class={"markdown"}/>
            }</p>
        </a>
    )
}