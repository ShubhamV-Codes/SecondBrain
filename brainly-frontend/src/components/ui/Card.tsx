import { ShareIcon } from "../../icons/ShareIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { TwitterEmbed } from "../content/TwitterEmbed";
import {YoutubeEmbed} from "../content/YoutubeEmbed";
import {DocumentEmbed} from "../content/DocumentEmbed";
import { LinkEmbed } from "../content/LinkEmbed";
interface CardProps {
  title: string;
  link: string;
  type: "document" | "youtube" | "twitter" | "link";
}


export const Card = (props: CardProps) => {
  return (
    <div>
      <div className="bg-white rounded-md shadow-sm outline-gray-200 border p-5  w-full max-w-72 overflow-hidden">
        <div className="flex justify-between">
            <div className="flex items-center">
                {props.title}
            </div>
            <div className="flex m-2">
                <a title="Share-Icon" href={props.link} target="_blank"><div className="px-2 text-grey-500"><ShareIcon size="md" /></div></a>
                <div className="px-1 text-grey-500"><DeleteIcon size="md" /></div>
            </div>
        </div>
        <div className="w-full ">
            {props.type==="youtube" && (
                <div className="w-max mt-3">
                <YoutubeEmbed url={props.link} />
                </div>
            )}
            {props.type==="twitter" && (
                <div className="mt-3">
                   <TwitterEmbed url={props.link} />
                </div>
            )}
            {props.type==="document" && (
                <div className="mt-3">
                    <DocumentEmbed url={props.link} />
                </div>
            )}
            {props.type==="link" && (
                <div className="mt-3">
                    <LinkEmbed url ={props.link} />
                    </div>
            )}
        </div>
      </div>
    </div>
  );
};
