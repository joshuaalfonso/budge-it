import { Spinner } from "@chakra-ui/react"

export const LoadingSpinner = () => {

    return (
        <div className="h-dvh! grid place-items-center ">
            <Spinner 
                color="blue.500" 
                size="xl" 
                animationDuration="0.7s" 
                borderWidth="4px" 
            />
        </div>
    )


}