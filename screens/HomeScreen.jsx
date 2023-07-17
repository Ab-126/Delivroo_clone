import { View, Text, Image, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import {
  UserIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import { ScrollView } from "react-native";
import FeaturedRow from "../components/FeaturedRow";
import Categories from "../components/Categories";
import SanityClient from "../sanity";

const HomeScreen = () => {
  const [featuredCategory, setFeaturedCategory] = useState([]);

  useEffect(() => {
    SanityClient.fetch(
      `
    *[_type == 'featured']{
      ...,
      restaurants[]->{
        ...,
        dishes[]->
      }
    }`
    ).then((data) => {
      setFeaturedCategory(data);
    });
  }, []);

  return (
    <View className="bg-white pt-9">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>

        <UserIcon size={35} color={"#00CCBB"} />
      </View>

      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-2">
          <MagnifyingGlassIcon color={"gray"} size={20} />
          <TextInput
            placeholder="Restraunts and cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsVerticalIcon color={"#00CCBB"} />
      </View>

      {/* Body */}
        <ScrollView contentContainerStyle={{ paddingBottom: 140 }} className="bg-gray-100 h-full">
          <Categories />

          {/* Featured */}
          {featuredCategory?.map((category) => (
            <FeaturedRow
              key={category._id}
              id={category._id}
              title={category.name}
              description={category.short_description}
            />
          ))}
        </ScrollView>
    </View>
  );
};

export default HomeScreen;
