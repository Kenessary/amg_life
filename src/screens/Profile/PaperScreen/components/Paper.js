import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BottomSheet } from "react-native-btr";
import i18n from "i18n-js";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../../../styles/colors";

import { shareAsync } from "expo-sharing";
import * as Print from "expo-print";

const Paper = ({
  visible,
  toggleBottomNavigationView,
  textMonth,
  valueYear,
  list,
  nas,
  uder,
  itog,
  setvisible,
}) => {
  const [toggle, setToggle] = useState(false);

  const createPDF = async () => {
    const imageUrl =
      "https://media.licdn.com/dms/image/C4E0BAQGv1DkH1fv_WA/company-logo_200_200/0/1630636367601/cnpc_amg_logo?e=2147483647&v=beta&t=j0ixWNdLB3WRbiIKldYEqHJbkA1U_AFtQGKRrkQw4ok";
    const htmlContent = `
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
        }
        .container {
          background-color: "white";
          padding: 20px;
        }
        .paperHeader {
          color:  "green";
          font-size: 24px;
          margin-bottom: 10px;
          margin-top:10px;
          text-align: center;
        }
        .divider {
          background-color: "green";
          height: 2px;
          margin-bottom: 10px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        th, td {
          border: 1px solid  "#ddd";
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: "#EAE9E9";
          color: ${Colors.smoothBlack};
        }
        td {
          background-color: "white";
          color: ${Colors.smoothBlack};;
        }
        .bold-text {
          font-size:20px;
          margin-bottom:10px;
          font-weight: bold;
          color: ${Colors.smoothBlack};;
        }
        .logo {
          width: 100px;
          height: 100px;
          display: block;
          margin-left: auto;
          margin-right: auto;
        }
      </style>
    </head>
    <body>
      <div class="container">
      <img src="${imageUrl}" class="logo" />
        <div class="paperHeader">${i18n.t(
          "paperTitle"
        )} ${textMonth} ${valueYear} ${i18n.t("paperYear")}</div>
        <div class="divider"></div>
        <div class="bold-text">${i18n.t("saldoBas")} ${list.saldo_nach}</div>
        <table>
          <thead>
            <tr>
              <th>${i18n.t("nasch")}</th>
              <th>${i18n.t("dni")}</th>
              <th>${i18n.t("summa")}</th>
            </tr>
          </thead>
          <tbody>
            ${nas
              .map(
                (item) => `
              <tr>
                <td>${item.rasch}</td>
                <td>${item.otrabotano}</td>
                <td>${item.summa}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>${i18n.t("uder")}</th>
              <th>${i18n.t("summa")}</th>
            </tr>
          </thead>
          <tbody>
            ${uder
              .map(
                (item) => `
              <tr>
                <td>${item.rasch}</td>
                <td>${item.summa}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>${itog[0]}</th>
              <th>${itog[1]}</th>
              <th>${itog[2]}</th>
              <th>${itog[3]}</th>
              <th>${itog[4]}</th>
            </tr>
          </thead>
        </table>
        <div class="bold-text">${i18n.t("saldoAiak")} ${list.saldo_kon}</div>
        <div>${i18n.t("chisla10")}</div>
        <div style="color:"red"; font-weight: bold;">${i18n.t("osms")}</div>
        <div>${i18n.t("footerText")}</div>
      </div>
    </body>
  </html>
 
    `;

    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    console.log(uri);

    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };
  return (
    <BottomSheet
      visible={visible}
      onBackButtonPress={toggleBottomNavigationView}
      onBackdropPress={toggleBottomNavigationView}
    >
      <View style={styles.container}>
        <Header
          textMonth={textMonth}
          valueYear={valueYear}
          setvisible={setvisible}
        />
        <Saldo list={list} />
        <Toggle toggle={toggle} setToggle={setToggle} />

        {!toggle ? (
          <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
            <TableHeader
              pics={"3"}
              firstWidth={"50%"}
              secondWidth={"24%"}
              thirdWidth={"26%"}
              firstTitle={i18n.t("nasch")}
              secondTitle={i18n.t("dni")}
              thirdTitle={i18n.t("summa")}
            />

            <TableBody array={nas} />

            <TableHeader
              pics={"2"}
              firstWidth={"75%"}
              secondWidth={"25%"}
              firstTitle={itog[0]}
              secondTitle={itog[2]}
            />
          </View>
        ) : (
          <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
            <TableHeader
              pics={"3"}
              firstWidth={"50%"}
              secondWidth={"24%"}
              thirdWidth={"26%"}
              firstTitle={i18n.t("uder")}
              secondTitle={i18n.t("dni")}
              thirdTitle={i18n.t("summa")}
            />

            <TableBody array={uder} />

            <TableHeader
              pics={"2"}
              firstWidth={"75%"}
              secondWidth={"25%"}
              firstTitle={itog[3]}
              secondTitle={itog[4]}
            />
          </View>
        )}
        <Text style={styles.osms}>{i18n.t("osms")}</Text>
        <Text style={styles.footerText}>{i18n.t("footerText")}</Text>

        <TouchableOpacity
          // disabled={isLoading === false ? false : true}
          style={{
            width: "100%",
            height: 50,
            backgroundColor: "#0a77c9",
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            marginBottom: 10,
            flexDirection: "row",
          }}
          onPress={() => createPDF()}
        >
          <AntDesign name="pdffile1" size={20} color="white" />
          <Text
            style={{
              fontSize: 16,
              color: Colors.white,
              fontWeight: "700",
              marginLeft: 5,
            }}
          >
            Сохранить как PDF
          </Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

const Header = ({ textMonth, valueYear, setvisible }) => {
  return (
    <View style={headerStyles.container}>
      <View style={headerStyles.titleContainer}>
        <Text style={headerStyles.title}>{i18n.t("paperTitle")}</Text>
        <TouchableOpacity onPress={() => setvisible(false)}>
          <AntDesign name="closecircle" size={25} color="grey" />
        </TouchableOpacity>
      </View>

      <Text style={headerStyles.date}>
        {textMonth} {valueYear} {i18n.t("paperYear")}
      </Text>
    </View>
  );
};

const Saldo = ({ list }) => {
  return (
    <View style={saldoStyles.container}>
      <View style={saldoStyles.viewContainer}>
        <Text style={saldoStyles.label}>{i18n.t("saldoBas")}</Text>
        <Text style={saldoStyles.text}>{list.saldo_nach}</Text>
      </View>

      <View style={saldoStyles.viewContainer}>
        <Text style={saldoStyles.label}>{i18n.t("saldoAiak")}</Text>
        <Text style={saldoStyles.text}> {list.saldo_kon}</Text>
      </View>
    </View>
  );
};

const Toggle = ({ toggle, setToggle }) => {
  return (
    <View style={toggleStyles.container}>
      <TouchableOpacity
        onPress={() => setToggle(false)}
        style={!toggle ? toggleStyles.activeBtn : toggleStyles.inActiveBtn}
      >
        <Text
          style={!toggle ? toggleStyles.activeText : toggleStyles.inActiveText}
        >
          {i18n.t("nasch")}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setToggle(true)}
        style={toggle ? toggleStyles.activeBtn : toggleStyles.inActiveBtn}
      >
        <Text
          style={toggle ? toggleStyles.activeText : toggleStyles.inActiveText}
        >
          {i18n.t("uder")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const TableHeader = ({
  pics,
  firstWidth,
  secondWidth,
  thirdWidth,
  firstTitle,
  secondTitle,
  thirdTitle,
}) => {
  return (
    <View
      style={
        pics === "2"
          ? tableHeaderStyles.tableContainer2
          : tableHeaderStyles.tableContainer
      }
    >
      <View style={{ width: firstWidth, alignItems: "flex-start" }}>
        <Text style={tableHeaderStyles.text}>{firstTitle}</Text>
      </View>
      <View style={{ width: secondWidth, alignItems: "flex-start" }}>
        <Text style={tableHeaderStyles.text}>{secondTitle}</Text>
      </View>
      {pics === "3" && (
        <View style={{ width: thirdWidth, alignItems: "flex-start" }}>
          <Text style={tableHeaderStyles.text}>{thirdTitle}</Text>
        </View>
      )}
    </View>
  );
};

const TableBody = ({ array }) => {
  return (
    <View style={tableBodyStyles.container}>
      {array.map((el, index) => (
        <View
          key={index}
          style={{
            ...tableBodyStyles.row,
            backgroundColor: index % 2 === 0 ? "#F4F6F8" : "#FFFFFF",
          }}
        >
          <View style={{ width: "50%", alignItems: "flex-start" }}>
            <Text style={tableBodyStyles.text}>{el.rasch}</Text>
          </View>
          <View style={{ width: "24%", alignItems: "flex-start" }}>
            <Text style={tableBodyStyles.text}>{el.otrabotano}</Text>
          </View>

          <View style={{ width: "26%", alignItems: "flex-start" }}>
            <Text style={tableBodyStyles.text}>{el.summa}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    paddingTop: 25,
    paddingBottom: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "white",
    height: "93%",
    alignItems: "center",
  },

  osms: {
    textAlign: "justify",
    fontSize: 12,
    color: Colors.primary,
    fontWeight: "bold",
    width: "94%",
    marginBottom: 2,
    marginTop: 10,
  },
  footerText: {
    textAlign: "left",
    fontSize: 12,
    width: "94%",
    color: Colors.smoothBlack,
  },
});

const headerStyles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  title: {
    color: Colors.smoothBlack,
    fontSize: 20,
    fontWeight: "700",
  },
  date: {
    marginTop: 5,
    color: Colors.smoothBlack,
    fontSize: 12,
    fontWeight: "400",
  },
});

const saldoStyles = StyleSheet.create({
  container: {
    width: "97%",
    backgroundColor: "rgba(0,0,0,0.04)",
    padding: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 15,
    marginBottom: 10,
  },
  viewContainer: {
    width: "49%",
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 7,
  },
  label: {
    fontSize: 13,
    color: Colors.smoothBlack,
  },
  text: {
    fontSize: 18,
    color: Colors.smoothBlack,
    fontWeight: "700",
    marginTop: 5,
  },
});

const toggleStyles = StyleSheet.create({
  container: {
    width: "97%",
    backgroundColor: "rgba(0,0,0,0.04)",
    flexDirection: "row",
    padding: 5,
    borderRadius: 10,
    marginVertical: 5,
  },
  activeBtn: {
    width: "50%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  inActiveBtn: {
    width: "50%",
    backgroundColor: "transparent",
    borderRadius: 8,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  activeText: {
    fontWeight: "600",
    color: Colors.smoothBlack,
  },
  inActiveText: {
    fontWeight: "400",
    color: Colors.smoothBlack,
  },
});

const tableBodyStyles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  row: {
    width: "95%",
    padding: 7,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 12,
    color: Colors.smoothBlack,
    fontWeight: "400",
  },
});

const tableHeaderStyles = StyleSheet.create({
  tableContainer: {
    width: "95%",
    backgroundColor: "#7B8EB0",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopEndRadius: 12,
    borderTopStartRadius: 12,
  },
  tableContainer2: {
    width: "95%",
    backgroundColor: "#7B8EB0",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomEndRadius: 12,
    borderBottomStartRadius: 12,
  },
  text: {
    fontSize: 12,
    color: Colors.white,
    fontWeight: "600",
  },
});

export default Paper;
