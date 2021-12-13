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
  Resolver,
  Root,
} from "type-graphql";

export interface IContext {
  hostName: string;
}

type MovieSource = "Bollywood" | "Hollywood";

@ObjectType()
class Movie {
  @Field({ defaultValue: "" })
  name!: string;

  @Field({ defaultValue: new Date() })
  releaseDate!: Date;

  @Field({ defaultValue: "Bollywood" })
  source!: MovieSource;

  @Field()
  isFlop!: boolean;

  constructor(name: string, releaseDate: Date, source: MovieSource) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.source = source;
  }
}

const db: Array<Movie> = [
  new Movie("The Batman", new Date(), "Hollywood"),
  new Movie("The Batman Begins", new Date(), "Hollywood"),
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

  @Field({ defaultValue: "Bollywood" })
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
  return buildSchema({
    resolvers: [QueryResolver, MutationResolver, MovieResolver],
    emitSchemaFile: true,
  });
};
