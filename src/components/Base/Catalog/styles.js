import { media } from "@/styles/mediaBrakepoints";
import styled from "@emotion/styled";

export const Form = styled.form`
    width: 600px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    padding: 20px 0;

    ${media.desktopMd}{
     grid-template-columns: repeat(3, 1fr);
    }
     ${media.tablet}{
     grid-template-columns: repeat(2, 1fr);
     width: 100%;
    }
      ${media.mobile}{
     grid-template-columns: repeat(1, 1fr);
     width: 100%;
    }
`

export const Row = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
`

export const ListRevalue = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;  
    
     ${media.tablet}{
     grid-template-columns: repeat(2, 1fr);
    }

    ${media.mobile}{
     grid-template-columns: repeat(1, 1fr);
    }
`