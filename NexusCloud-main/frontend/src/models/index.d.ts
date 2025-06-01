import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";





type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly tags?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly tags?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerLecture = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Lecture, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly description?: string | null;
  readonly teacher?: User | null;
  readonly posts?: (Post | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly lectureTeacherId?: string | null;
}

type LazyLecture = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Lecture, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly description?: string | null;
  readonly teacher: AsyncItem<User | undefined>;
  readonly posts: AsyncCollection<Post>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly lectureTeacherId?: string | null;
}

export declare type Lecture = LazyLoading extends LazyLoadingDisabled ? EagerLecture : LazyLecture

export declare const Lecture: (new (init: ModelInit<Lecture>) => Lecture) & {
  copyOf(source: Lecture, mutator: (draft: MutableModel<Lecture>) => MutableModel<Lecture> | void): Lecture;
}

type EagerPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Post, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly content: string;
  readonly author?: User | null;
  readonly lecture?: Lecture | null;
  readonly comments?: (Comment | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly lecturePostsId?: string | null;
  readonly postAuthorId?: string | null;
}

type LazyPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Post, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly content: string;
  readonly author: AsyncItem<User | undefined>;
  readonly lecture: AsyncItem<Lecture | undefined>;
  readonly comments: AsyncCollection<Comment>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly lecturePostsId?: string | null;
  readonly postAuthorId?: string | null;
}

export declare type Post = LazyLoading extends LazyLoadingDisabled ? EagerPost : LazyPost

export declare const Post: (new (init: ModelInit<Post>) => Post) & {
  copyOf(source: Post, mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void): Post;
}

type EagerComment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Comment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly content: string;
  readonly author?: User | null;
  readonly post?: Post | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly postCommentsId?: string | null;
  readonly commentAuthorId?: string | null;
}

type LazyComment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Comment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly content: string;
  readonly author: AsyncItem<User | undefined>;
  readonly post: AsyncItem<Post | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly postCommentsId?: string | null;
  readonly commentAuthorId?: string | null;
}

export declare type Comment = LazyLoading extends LazyLoadingDisabled ? EagerComment : LazyComment

export declare const Comment: (new (init: ModelInit<Comment>) => Comment) & {
  copyOf(source: Comment, mutator: (draft: MutableModel<Comment>) => MutableModel<Comment> | void): Comment;
}

type EagerEvent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Event, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly description: string;
  readonly date: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEvent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Event, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly description: string;
  readonly date: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Event = LazyLoading extends LazyLoadingDisabled ? EagerEvent : LazyEvent

export declare const Event: (new (init: ModelInit<Event>) => Event) & {
  copyOf(source: Event, mutator: (draft: MutableModel<Event>) => MutableModel<Event> | void): Event;
}