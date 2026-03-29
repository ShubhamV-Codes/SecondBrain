import{useState}from "react";
import {Button} from "../components/ui/Button";
import { PlusIcon } from '../icons/PlusIcon';
import { ShareIcon } from '../icons/ShareIcon';
import {Card} from "../components/ui/Card";
import { CreateContentModal } from "../components/PopupModel/CreateContentModal";
import { Sidebar } from "../components/ui/Sidebar";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { BrainIcon } from "../icons/BrainIcon";


export const Dashboard=()=> {
  const[modalOpen, setModalOpen]=useState(false);

  return (
    <div>
     <div>
      <Sidebar/>
     </div>
     <div className="ml-72 h-min-h-screen bg-gray-100 border-2">
       <CreateContentModal open={modalOpen} onClose={()=>{
      setModalOpen(!modalOpen)}
    }/>


    <div className="flex justify-end gap-4 p-4">
      <Button
     variant='secondary' 
     text='Share Brainly'
      size='md' 
      startIcon={< ShareIcon size={"md"}/>} 
      onClick={()=>setModalOpen(true)
      
    }/>
    
    <Button 
    variant='primary' 
    text='Add Content' 
    size='md'
    startIcon={<PlusIcon size={"md"} />} 
    onClick={()=>setModalOpen(true)}/>
    </div>

    <CreateContentModal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
    />
    
    <div className="p-4 grid grid-cols-3 gap-4">
    <Card title="Project Ideas" type="document" link="https://youtu.be/DYBWbmhisiM?si=wGSZDxMVz7xzoP39" />
    <Card title="Project Ideas" type="link" link="https://youtu.be/DYBWbmhisiM?si=wGSZDxMVz7xzoP39" />
    {/* <Card title="Project Ideas" type="youtube" link="https://youtu.be/DYBWbmhisiM?si=wGSZDxMVz7xzoP39" /> */}
    <Card title="Project Ideas" type="twitter" link="https://twitter.com/XDevelopers/status/2019881223666233717?s=20" />
    <Card title="Project Ideas" type="document" link="https://youtu.be/DYBWbmhisiM?si=wGSZDxMVz7xzoP39" />
    <Card title="Project Ideas" type="link" link="https://youtu.be/DYBWbmhisiM?si=wGSZDxMVz7xzoP39" />
    <TwitterIcon size="lg" />
    <YoutubeIcon size="lg"/>
    <BrainIcon size="lg"/>
   
    </div>


     </div>
   
    </div>
    
  )
}
