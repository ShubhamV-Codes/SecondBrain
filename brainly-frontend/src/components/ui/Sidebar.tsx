import { BrainIcon } from "../../icons/BrainIcon"
import { DocumentIcon } from "../../icons/DocumentIcon"
import { LinkIcon } from "../../icons/LinkIcon"
import { TwitterIcon } from "../../icons/TwitterIcon"
import { YoutubeIcon } from "../../icons/YoutubeIcon"
import { SidebarItem } from "./SidebarItem"

export const Sidebar = () => {
    return (
        <div className="h-screen bg-white border-r w-72 fixed left-0 top-0">
            <div className="pt-4">
                <div className="px-4 py-2 text-lg font-bold mb-9 flex"> <BrainIcon size="lg"/> <h1> &nbsp;Brainly: A Second Brain</h1>
                </div>
                <div><SidebarItem text="Twitter" icon={<TwitterIcon size="lg" />} /></div>
                <div> <SidebarItem text="Youtube" icon={<YoutubeIcon size="lg"/>} /></div>
                <div> <SidebarItem text="Link" icon={<LinkIcon size="lg" />} /></div>
                <div> <SidebarItem text="Document" icon={<DocumentIcon size="lg" />} /></div>
                
                

                
               
               
            </div>
        </div>
    )
}