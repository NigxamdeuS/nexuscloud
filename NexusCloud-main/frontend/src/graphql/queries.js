/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      role
      tags
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        role
        tags
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        role
        tags
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getLecture = /* GraphQL */ `
  query GetLecture($id: ID!) {
    getLecture(id: $id) {
      id
      title
      description
      teacher {
        id
        name
        role
        tags
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      posts {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      lectureTeacherId
      __typename
    }
  }
`;
export const listLectures = /* GraphQL */ `
  query ListLectures(
    $filter: ModelLectureFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLectures(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        lectureTeacherId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncLectures = /* GraphQL */ `
  query SyncLectures(
    $filter: ModelLectureFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncLectures(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        title
        description
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        lectureTeacherId
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      content
      author {
        id
        name
        role
        tags
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      lecture {
        id
        title
        description
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        lectureTeacherId
        __typename
      }
      comments {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      lecturePostsId
      postAuthorId
      owner
      __typename
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        lecturePostsId
        postAuthorId
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncPosts = /* GraphQL */ `
  query SyncPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPosts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        content
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        lecturePostsId
        postAuthorId
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      content
      author {
        id
        name
        role
        tags
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      post {
        id
        content
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        lecturePostsId
        postAuthorId
        owner
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      postCommentsId
      commentAuthorId
      owner
      __typename
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        postCommentsId
        commentAuthorId
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncComments = /* GraphQL */ `
  query SyncComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncComments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        content
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        postCommentsId
        commentAuthorId
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      id
      description
      date
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        description
        date
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncEvents = /* GraphQL */ `
  query SyncEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncEvents(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        description
        date
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
