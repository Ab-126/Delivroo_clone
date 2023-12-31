import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestrauntCard from "./RestrauntCard";
import sanityClient from "../sanity";

const FeaturedRow = ({ id, title, description }) => {
  const [restraunts, setRestraunts] = useState([]);
  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == 'featured' && _id == $id]{
      ...,
      restaurants[] ->{
        ...,
        dishes[]->,
        type->{
          name
        }
      }
    }[0]
    `,
        { id }
      )
      .then((data) => {
        setRestraunts(data?.restaurants);
      });
  }, [id]);

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color={"#00CCBB"} size={20} />
      </View>

      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {restraunts?.map((restaurant) => (
          <RestrauntCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.type?.name}
            address={"123 Main St"}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
