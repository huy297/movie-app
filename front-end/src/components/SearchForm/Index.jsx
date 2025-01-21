import { useForm } from "react-hook-form";
import FormField from "./FormField";
import MediaTypeInput from "./FormInput/MediaTypeInput";
import GenresInput from "./FormInput/GenresInput";
import RatingInput from "./FormInput/RatingInput";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const SearchForm = ({setSearchFormValues}) => {
  const [searchParams] = useSearchParams();
  const mediaType = searchParams.get('mediaType');
  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      mediaType: ['tv', 'movie'].includes(mediaType) ? mediaType : 'movie',
      genres: [],
      rating: 'All'
    }
  });
  const onSubmit = (data) => {
    console.log(data);
  };

  const formValues = watch();
  console.log({formValues});

  useEffect(() => {
    setSearchFormValues(formValues);
  }, [JSON.stringify(formValues)]);

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="mediaType"
          label="Media Type"
          control={control}
          Component={MediaTypeInput}
        />
        <FormField
          name="genres"
          label="Genres"
          control={control}
          Component={GenresInput}
        />
        <FormField
          name="rating"
          label="Rating"
          control={control}
          Component={RatingInput}
        />
        <input type="submit"></input>
      </form>
      Search Form
    </div>
  );
};

export default SearchForm;
