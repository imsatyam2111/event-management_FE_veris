import { gql } from "@apollo/client";

export const GET_ALL_EVENTS = gql`
    query getAllEvents {
        getAllEvents {
            id
            name
            date
            time
            guests
            duration
            location
            description
        }
    }
`;