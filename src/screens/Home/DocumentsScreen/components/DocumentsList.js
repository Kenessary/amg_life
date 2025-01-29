// import React from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { Colors } from "../../../../styles/colors";
// import { UIActivityIndicator } from "react-native-indicators";
// import i18n from "i18n-js";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";

// const DocumentsList = ({ documents, isLoading, type }) => {
//   const navigation = useNavigation();
//   console.log(documents, "dddd");
//   let docs = [];
//   for (let i = 0; i < documents && documents.length; i++) {
//     type === "edo" &&
//       docs.push(
//         <TouchableOpacity
//           key={i}
//           style={styles.btn}
//           onPress={() => {
//             navigation.navigate("DocumentPdfScreen", [
//               documents[i].guid,
//               documents[i].type,
//             ]);
//           }}
//         >
//           <Text style={styles.docNameText}>{documents[i].Name}</Text>

//           <View style={styles.bottomContainer}>
//             <View style={styles.docNumberContainer}>
//               <Text
//                 style={{
//                   color: "grey",
//                   fontSize: 12,
//                   fontWeight: "600",
//                 }}
//               >
//                 {documents[i].Number}
//               </Text>
//             </View>
//             <Text style={{ color: Colors.smoothBlack, fontSize: 12 }}>
//               {documents[i].DateDoc}
//             </Text>
//           </View>
//         </TouchableOpacity>
//       );
//   }

//   // let docsForOa = []

//   // for (let i = 0; i < documents.length; i++) {
//   //   docs.push(
//   //     <TouchableOpacity
//   //       key={i}
//   //       style={styles.btn}
//   //       // onPress={() => {
//   //       //   navigation.navigate("DocumentPdfScreen", [
//   //       //     documents[i].guid,
//   //       //     documents[i].type,
//   //       //   ]);
//   //       // }}
//   //     >
//   //       <Text style={styles.docNameText}>{documents[i].mail_name}</Text>

//   //       <View style={styles.bottomContainer}>
//   //         <View style={styles.docNumberContainer}>
//   //           <Text
//   //             style={{
//   //               color: "grey",
//   //               fontSize: 12,
//   //               fontWeight: "600",
//   //             }}
//   //           >
//   //             {documents[i].system}
//   //           </Text>
//   //         </View>
//   //         {/* <Text style={{ color: Colors.smoothBlack, fontSize: 12 }}>
//   //           {documents[i].DateDoc}
//   //         </Text> */}
//   //       </View>
//   //     </TouchableOpacity>
//   //   );
//   // }

//   // let docsForOa = []

//   // for (let i = 0; i < documents.length; i++) {
//   //   docs.push(
//   //     <TouchableOpacity
//   //       key={i}
//   //       style={styles.btn}
//   //       // onPress={() => {
//   //       //   navigation.navigate("DocumentPdfScreen", [
//   //       //     documents[i].guid,
//   //       //     documents[i].type,
//   //       //   ]);
//   //       // }}
//   //     >
//   //       <Text style={styles.docNameText}>{documents[i].mail_name}</Text>

//   //       <View style={styles.bottomContainer}>
//   //         <View style={styles.docNumberContainer}>
//   //           <Text
//   //             style={{
//   //               color: "grey",
//   //               fontSize: 12,
//   //               fontWeight: "600",
//   //             }}
//   //           >
//   //             {documents[i].system}
//   //           </Text>
//   //         </View>
//   //         {/* <Text style={{ color: Colors.smoothBlack, fontSize: 12 }}>
//   //           {documents[i].DateDoc}
//   //         </Text> */}
//   //       </View>
//   //     </TouchableOpacity>
//   //   );
//   // }

//   return (
//     <View style={{ alignItems: "center" }}>
//       {isLoading === true ? (
//         <UIActivityIndicator
//           color={"grey"}
//           size={30}
//           style={{ marginTop: 20 }}
//         />
//       ) : documents && documents.length === 0 ? (
//         <View style={{ alignItems: "center", marginTop: 50 }}>
//           <Ionicons
//             name="documents-sharp"
//             size={80}
//             color={"rgba(0,0,0, 0.2)"}
//           />
//           <Text
//             style={{
//               marginTop: 10,
//               fontSize: 18,
//               color: "rgba(0,0,0, 0.5)",
//               fontWeight: "500",
//             }}
//           >
//             {i18n.t("noData")}
//           </Text>
//         </View>
//       ) : (
//         docs
//       )}
//       <View style={{ marginBottom: 100 }} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   btn: {
//     width: "90%",
//     backgroundColor: "white",
//     borderRadius: 10,
//     marginBottom: 10,
//     padding: 15,
//     alignItems: "center",
//   },
//   docNameText: {
//     color: Colors.smoothBlack,
//     fontWeight: "500",
//     fontSize: 16,
//     width: "100%",
//     marginBottom: 20,
//   },
//   bottomContainer: {
//     width: "100%",
//     justifyContent: "space-between",
//     flexDirection: "row",
//   },
//   docNumberContainer: {
//     padding: 4,
//     backgroundColor: "#EBEBEB",
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 5,
//   },
// });

// export default DocumentsList;

import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../../styles/colors";
import { UIActivityIndicator } from "react-native-indicators";
import i18n from "i18n-js";
import {
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signDocument } from "../api/api";
import { AuthContext } from "../../../../context/AuthContext";

const DocumentsList = ({
  documents,
  isLoading,
  type,
  setSignDocumentModal,
  setSignDocumentResult,
  setSignDocumentLoad,
}) => {
  const { iin } = useContext(AuthContext);

  const navigation = useNavigation();

  // useEffect(() => {
  //   if (!setShowSignDocument) {
  //     setCurrentDocGuid("");
  //   }
  // }, [showSignDocument]);
  let docs = [];
  if (documents) {
    for (let i = 0; i < documents.length; i++) {
      if (type === "edo") {
        docs.push(
          <TouchableOpacity
            disabled={documents[i].action === "true"}
            key={i}
            style={{ ...styles.btn }}
            onPress={() => {
              navigation.navigate("DocumentPdfScreen", [
                type,
                documents[i].guid,
                documents[i].type,
              ]);
            }}
          >
            <Text style={{ ...styles.docNameText }}>{documents[i].Name}</Text>

            <View style={styles.bottomContainer}>
              <View style={styles.docNumberContainer}>
                <Text
                  style={{ color: "grey", fontSize: 12, fontWeight: "600" }}
                >
                  {documents[i].Number}
                </Text>
              </View>
              <Text style={{ color: Colors.smoothBlack, fontSize: 12 }}>
                {documents[i].DateDoc}
              </Text>
            </View>

            <View
              style={{
                width: "100%",
                padding: 5,
                marginTop: 15,
                backgroundColor: "rgba(0,0,0,0.05)",
                borderRadius: 15,
                flexDirection: "row",
                justifyContent: "space-between",
                display: documents[i].action === "true" ? "flex" : "none",
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  signDocument(
                    iin,
                    documents[i].type,
                    documents[i].guid,
                    setSignDocumentModal,
                    setSignDocumentResult,
                    setSignDocumentLoad,
                    "sign"
                  )
                }
                style={{
                  padding: 5,
                  backgroundColor: "white",
                  borderRadius: 13,
                  width: "49%",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <MaterialCommunityIcons
                  name="file-document-edit"
                  size={12}
                  color={Colors.smoothBlack}
                />
                <Text
                  style={{
                    color: Colors.smoothBlack,
                    fontSize: 11,
                    fontWeight: "500",
                    marginLeft: 5,
                  }}
                >
                  Подписать документ
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  signDocument(
                    iin,
                    documents[i].type,
                    documents[i].guid,
                    setSignDocumentModal,
                    setSignDocumentResult,
                    setSignDocumentLoad,
                    "cancel"
                  )
                }
                style={{
                  padding: 5,
                  backgroundColor: "white",
                  borderRadius: 13,
                  width: "49%",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <MaterialIcons name="cancel" size={14} color={Colors.primary} />
                <Text
                  style={{
                    color: Colors.primary,
                    fontSize: 11,
                    fontWeight: "500",
                    marginLeft: 5,
                  }}
                >
                  Отклонить документ
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: "100%",
                marginTop: 8,
                alignItems: "flex-end",
                borderRadius: 15,

                display: documents[i].action === "true" ? "flex" : "none",
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("DocumentPdfScreen", [
                    type,
                    documents[i].guid,
                    documents[i].type,
                  ])
                }
                style={{
                  padding: 5,
                  backgroundColor: "rgba(0,0,0,0.02)",
                  borderRadius: 13,
                  width: "49%",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    color: Colors.grey,
                    fontSize: 11,
                    fontWeight: "500",
                    marginRight: 5,
                  }}
                >
                  Смотреть документ
                </Text>
                <Entypo
                  name="chevron-small-right"
                  size={12}
                  color={Colors.grey}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        );
      } else if (type === "oa") {
        docs.push(
          <TouchableOpacity
            key={i}
            style={styles.btn}
            onPress={() => {
              navigation.navigate("DocumentPdfScreen", [
                type,
                documents[i].mail_id,
              ]);
            }}
          >
            <Text style={styles.docNameText}>{documents[i].mail_name}</Text>

            <View style={styles.bottomContainer}>
              <View style={styles.docNumberContainer}>
                <Text
                  style={{ color: "grey", fontSize: 12, fontWeight: "600" }}
                >
                  {documents[i].system === "oa" && "OA"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      } else if (type === "1c") {
        docs.push(
          <TouchableOpacity
            key={i}
            style={styles.btn}
            disabled={true}
            // onPress={() => {
            //   navigation.navigate("DocumentPdfScreen", [
            //     documents[i].guid,
            //     documents[i].type,
            //   ]);
            // }}
          >
            <Text style={styles.docNameText}>{documents[i].doc}</Text>

            <View style={styles.bottomContainer}>
              <View style={styles.docNumberContainer}>
                <Text
                  style={{ color: "grey", fontSize: 12, fontWeight: "600" }}
                >
                  {documents[i].tip_doc}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }
    }
  }

  return (
    <View style={{ alignItems: "center" }}>
      {isLoading ? (
        <UIActivityIndicator
          color={"grey"}
          size={30}
          style={{ marginTop: 20 }}
        />
      ) : documents && documents.length === 0 ? (
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Ionicons
            name="documents-sharp"
            size={80}
            color={"rgba(0,0,0, 0.2)"}
          />
          <Text
            style={{
              marginTop: 10,
              fontSize: 18,
              color: "rgba(0,0,0, 0.5)",
              fontWeight: "500",
            }}
          >
            {i18n.t("noData")}
          </Text>
        </View>
      ) : (
        docs
      )}
      <View style={{ marginBottom: 100 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    alignItems: "center",
  },
  docNameText: {
    color: Colors.smoothBlack,
    fontWeight: "500",
    fontSize: 16,
    width: "100%",
    marginBottom: 20,
  },
  bottomContainer: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  docNumberContainer: {
    padding: 4,
    backgroundColor: "#EBEBEB",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});

export default DocumentsList;
