import { gql } from "@apollo/client";

export const CREATE_EVENT = gql`
    mutation createEvent(
        $name: String!
        $date: String!
        $time: String!
        $duration: String!
        $description: String!
        $guests: [String]!
    ) {
        createEvent(
            name: $name
            date: $date
            time: $time
            duration: $duration
            description: $description
            guests: $guests
        ) {
            successful
            message
        }
    }
`;