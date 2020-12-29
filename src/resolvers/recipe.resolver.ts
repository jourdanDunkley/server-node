import { Recipe } from "../entities/index";
import { getRepository } from "typeorm";

import { 
  Arg, 
  Mutation, 
  Resolver, 
  Query, 
  Field, 
  InputType 
} from "type-graphql";

import { 
  ArrayMaxSize, 
  Length, 
  MaxLength
} from "class-validator";

@InputType()
class RecipeInput {
  @Field()
  @MaxLength(30)
  title: string;

  @Field({ nullable: true })
  @Length(30, 255)
  description?: string;

  @Field(() => String)
  @ArrayMaxSize(30)
  ingredients: string;
}


@Resolver()
export class RecipeResolver {
  recipeRepository = getRepository(Recipe);

  @Query(() => Recipe)
  async findRecipeByID(@Arg("id") id: string) {
    const recipe = await Recipe.findOne({ where: { id }});
    return recipe;
  }

  @Query(() => [Recipe])
  async recipes() {
    return await Recipe.find();
  }

  @Mutation(() => Recipe)
  async createRecipe(
    @Arg("newRecipeData") newRecipeData: RecipeInput) {
    const recipe = Recipe.create(newRecipeData);
    await recipe.save();
    return recipe
  }

  @Mutation(() => Recipe)
  async updateRecipe(
    @Arg("id") id: string,
    @Arg("updateRecipe") updateRecipeData: RecipeInput){
    const recipe = await Recipe.findOne({ where: { id }});
    if(recipe){
      Recipe.merge(recipe, updateRecipeData);
      await recipe.save();
      return recipe;
    }
  }
  
  @Mutation(() => Boolean)
  async removeRecipe(@Arg("id") id: string) {
    try {
      const recipe = await Recipe.findOne({ where: { id }})
      await recipe.remove();
      return true;
    } catch {
      return false;
    }
  }
}