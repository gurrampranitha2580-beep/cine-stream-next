import { getGenres } from "../../../lib/tmdb";

export async function GET() {
  try{
    const data = await getGenres();

    return Response.json(data);
  }
  catch(error){
    return Response.json(
      { genres: [] },
      { status: 500 }
    );
  }
}