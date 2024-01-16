import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

export default function UserAlert({message}:{message:string}) {
    return(
        <Alert variant="destructive" className={"UserAlert"}>
            <AlertTitle><strong>Error while loading Application</strong></AlertTitle>
            <AlertDescription>
                The Application has encountered an error while loading your content. Please try again later. <br/>
                Error: {message}
            </AlertDescription>
        </Alert>
    )
}