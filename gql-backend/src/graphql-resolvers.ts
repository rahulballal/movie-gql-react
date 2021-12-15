import {
  Arg,
  buildSchema,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  ObjectType,
  Query,
  registerEnumType,
  Resolver,
  Root,
} from "type-graphql";

export interface IContext {
  hostName: string;
}

enum MovieSource {
  BOLLYWOOD = "Bollywood",
  HOLLYWOOD = "Hollywood",
  UNKNOWN = "Not Set",
}

@ObjectType()
class Movie {
  @Field({ nullable: false })
  name!: string;

  @Field({ nullable: false })
  releaseDate!: Date;

  @Field(() => MovieSource, { nullable: false })
  source: MovieSource = MovieSource.UNKNOWN;

  @Field({ nullable: false })
  isFlop!: boolean;

  constructor(name: string, releaseDate: Date, source: MovieSource) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.source = source;
  }
}

const db: Array<Movie> = [
  new Movie("The Batman", new Date(), MovieSource.HOLLYWOOD),
  new Movie("The Batman Begins", new Date(), MovieSource.HOLLYWOOD),
];

@Resolver()
export class QueryResolver {
  @Query(() => Movie)
  movie(@Ctx() ctx: IContext) {
    console.log("Got called from " + ctx.hostName);
    return db[0];
  }

  @Query(() => [Movie])
  movies() {
    return db;
  }
}

@InputType()
class AddMovieInput {
  @Field({ defaultValue: "" })
  name!: string;

  @Field({ defaultValue: MovieSource.UNKNOWN })
  source!: MovieSource;
}

@Resolver()
export class MutationResolver {
  @Mutation(() => Movie)
  addMovie(@Arg("addMovieInput") args: AddMovieInput) {
    const newMovie = new Movie(args.name, new Date(), args.source);
    db.push(newMovie);
    return newMovie;
  }
}

@Resolver(() => Movie)
export class MovieResolver {
  @FieldResolver()
  isFlop(@Root() parentMovie: Movie) {
    return parentMovie.source === "Hollywood" ? true : false;
  }
}

export const getGQLSchema = async () => {
  registerEnumType(MovieSource, {name: 'MovieSource'})
  return buildSchema({
    resolvers: [QueryResolver, MutationResolver, MovieResolver],
    emitSchemaFile: true,
  });
};
