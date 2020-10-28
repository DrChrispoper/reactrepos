import { gql } from '@apollo/client';

export const REPOS = gql`
  query Repos {
    search(first: 100, type: REPOSITORY, query: "topic:react") {
      repositoryCount
      pageInfo {
        hasNextPage
        endCursor
        hasPreviousPage
      }
      nodes {
        ... on Repository {
          id
          name
          forkCount
          stargazerCount
          url
        }
      }
    }
  }
`;

export const MORE_REPOS = gql`
  query MoreRepos($_cursor: String = null) {
    search(
      first: 100
      type: REPOSITORY
      query: "topic:react"
      after: $_cursor
    ) {
      repositoryCount
      pageInfo {
        hasNextPage
        endCursor
        hasPreviousPage
      }
      nodes {
        ... on Repository {
          id
          name
          forkCount
          stargazerCount
          url
        }
      }
    }
  }
`;
