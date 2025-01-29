import { Skeleton } from "@rneui/themed";

export const FoodBalanceLoader = () => {
  return (
    <Skeleton
      style={{
        backgroundColor: "rgba(0,0,0,0.04)",
        height: 190,
        width: "85%",
        borderRadius: 15,
        marginTop: 15,
      }}
      animation="pulse"
      skeletonStyle={{ backgroundColor: "rgba(0,0,0,0.1)" }}
    />
  );
};

export const FoodMenuLoader = () => {
  return (
    <>
      <Skeleton
        style={{
          backgroundColor: "rgba(0,0,0,0.04)",
          height: 60,
          width: "85%",
          borderRadius: 15,
          marginBottom: 10,
          marginTop: 25,
        }}
        animation="pulse"
        skeletonStyle={{ backgroundColor: "rgba(0,0,0,0.1)" }}
      />
      <Skeleton
        style={{
          backgroundColor: "rgba(0,0,0,0.04)",
          height: 60,
          width: "85%",
          borderRadius: 15,
          marginBottom: 10,
        }}
        animation="pulse"
        skeletonStyle={{ backgroundColor: "rgba(0,0,0,0.1)" }}
      />
      <Skeleton
        style={{
          backgroundColor: "rgba(0,0,0,0.04)",
          height: 60,
          width: "85%",
          borderRadius: 15,
          marginBottom: 10,
        }}
        animation="pulse"
        skeletonStyle={{ backgroundColor: "rgba(0,0,0,0.1)" }}
      />
      <Skeleton
        style={{
          backgroundColor: "rgba(0,0,0,0.04)",
          height: 60,
          width: "85%",
          borderRadius: 15,
          marginBottom: 10,
        }}
        animation="pulse"
        skeletonStyle={{ backgroundColor: "rgba(0,0,0,0.1)" }}
      />
      <Skeleton
        style={{
          backgroundColor: "rgba(0,0,0,0.04)",
          height: 60,
          width: "85%",
          borderRadius: 15,
          marginBottom: 10,
        }}
        animation="pulse"
        skeletonStyle={{ backgroundColor: "rgba(0,0,0,0.1)" }}
      />
    </>
  );
};
