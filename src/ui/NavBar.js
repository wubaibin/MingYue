/**
 * @description: 导航栏
 * @author: wubaibin
 */
import { Text, StyleSheet, View, StatusBar, Image, TouchableOpacity } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Color, Config } from "./utils/config";
import StringRegular from './utils/string';
import Route from "../router/route";

NavBar.propTypes = {
  // 标题
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  // 标题长度
  titleLength: PropTypes.number,
  // 标题大小
  titleSize: PropTypes.number,
  // 标题颜色
  titleColor: PropTypes.string,
  // 标题自定义样式
  titleStyle: PropTypes.object,
  // 背景颜色
  bgColor: PropTypes.string,
  // 返回按钮是采用黑的还是白的 默认是黑的
  mode: PropTypes.oneOf(['black', 'white']),
  // 设置状态栏文本的颜色
  barStyle: PropTypes.oneOf(['default', 'light-content', 'dark-content']),
  // 自定义left
  left: PropTypes.object,
  // 自定义right
  right: PropTypes.object,
}

NavBar.defaultProps = {
  titleLength: 11,
  titleSize: 19,
  titleColor: Color.navBarTitle,
  titleStyle: {},
  mode: "black",
  bgColor: Color.navBarBg,
  barStyle: "dark-content",
}

export default function NavBar(props) {
  const insets = useSafeAreaInsets();
  const { title, titleLength, titleSize, titleColor, titleStyle, mode, bgColor, barStyle, left, right } = props;
  const left_white = 'data:image/png;base64,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';
  const left_black = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAARMElEQVR4Xu2de5Ac1XXGz+mVEMRSSJEiReyyZZOyjXZ6VppuCUqClGUH7fSs5Te7kpZEYAxOCJhXUgSwcewYZBNiiMwjgAuDXrgSgZ3EQtMjQwoqIcKxpkfs9EioSjg2JkkF4lBYSYS1u3NSDSqXkLSr7tOzu9N9v/n7fPfe8/vup97V9tzLhA8IgMCEBBhsQAAEJiaAgGB3gMAkBBAQbA8QQECwB0BARwBPEB03qAwhgIAYYjTa1BFAQHTcoDKEAAJiiNFoU0cAAdFxg8oQAgiIIUajTR0BBETHDSpDCCAghhiNNnUEEBAdN6gMIYCAGGI02tQRQEB03KAyhAACYojRaFNHAAHRcYPKEAIIiCFGo00dAQRExw0qQwggIIYYjTZ1BBAQHTeoDCGAgBhiNNrUEUBAdNygMoQAAmKI0WhTRwAB0XGDyhACCIghRqNNHQEERMcNKkMIICCGGB23zaLT74r0LCOWl4h5JKxXX4irzWMdApJHVxU9FV1vUISuJaKlR8pFaKtFdGez4e9UDJt5CQKSeQvTN2CXvHXEdOMJRloYBv5I+tmyNQICki2/Or7aglO+i4mvjDHwjjDwyzHqclWCgOTKzmTNFEvew8J0UVwVCy0z7UctBCTu7shRXV9f/9vas6yNRPTJJG0x0XXNwL8ziSbrtQhI1h1MuP7eJQNnWOPtDUTUn1BKRNZHwmD7tuS67CoQkOx6l3jlCxateG+P1ROF4y3/UxV3oHGWt++t1/4jbn0e6hCQPLgYo4c+t+y0xdpAJHaM8mNLmG4K6/5XVdoMixCQDJsXd+nFUuUDwhI9OebH1RxV9zdh4K9SajMtQ0Aybd+JF287/SspenIwnXbi6uNUMD0Y1v1LVdociBCQHJg4UQuFkreGmaInx2xdm7w+DKrX6LT5UCEg+fDxmC4KTuUyJnlA2x4z3dKs+zdr9XnRISB5cfKIPool7zph+rq2NRG5odWo3abV50mHgOTJTSKyHe9PiehL2raE6YpW3b9Xq8+bDgHJkaN2qfIXxPJH6pZE1oaN2ia1PodCBCQnphYc734m+qyyndeJaDgM/O8q9bmVISAZt3ZwcLDn+R8d2CRCa5StvMIiw81G7QmlPtcyBCTD9i5a9PFfG7MObiLilco2fmQRXzgSVJ9V6nMvQ0AyarG9pP+dNG5Fvy98QNnCSHtchvc8V2sp9UbIEJAM2lwoVXqZJQqHo1q+0DNta2x4T/2JF1V6g0QISMbM7nMHzhFqbxSh9ymXXuPRnjXN5uOvKvVGyRCQDNltL+pfQVb0Ri79pmbZwvTo6fNeX/PUU0+NafQmahCQjLhuO1707b8oHHN1S+aHwqB6iU5rrgoByYD3Bde7iIUeVi+V6a6w7l+l1hssREC63PyiU75SiO/SL5PXhUH183q92UoEpIv9L7reDSKk/xafod8C7KSlCEgnaXZwLNup3EokN2mHZJLPNYPa3Vo9dG8SQEC6cCfYrvcNEvqcdmnCdHGr7ke/0OOTkgACkhJgp+UFx3uIiS5WjntIRIZbjdpjSj1kRxFAQLpkS7x7+fKT5/78lM1E8inlkn5GzMNhvbpDqYfsOAQQkC7YFqVS5fRRls26w9ze+Dn5xyQ0bNqxoNNhHQIyHZQnmaO45MNnyvh4FA7VYW5EElqWrBnZtSOc4VZyOT0CMoO2Fkrlhcy0mYh1h7kR7RwXa83exvafzGAbuZ4aAZkhe3td7zxLonAoD3MT+b4cotWtVu2/Z6gFI6ZFQGbA5uIib0Asik5X/3Xl9N+Zw6+srtfro0o9ZDEJICAxQXWqzHb6VxG9cfXASZoxWWhDs+Fr/xtYM6XRGgRkGu0vuOVLWfib2imF6J5W4Me5DUo7BXT4O8jM7IGC413LRHdoZxehr7Ua/onuEdQOD90EBPAEmYatUXQrXxSRL+un4i+EQfVWvR5KLQEEREsups52vNuJ6I9jlh9bJnR12PC/odZDmIoAApIK3+Ri2/HuI6Lf107BRJ9uBr7+i1LaiaH7JQEEZIo2Q7FU2SIsw8rhx0Ss1a3Gdrx0qATYKRkC0imSh8d5/7kfnTf74KEtRPQR5dCvEvNqvHSopNdhGQLSQaCl0oq3j1LPFmJarhuWX2SR1XjpUEdvKlQISIeo9i323t9uU/TkcJVD7rGsnlUjux7HS4dKgFMhQ0A6QNUuDSwWq72FlYe5MfEPxoRX4aXDDpjR4SEQkJRAC275gywcPTl0h7kRPUlzZKi1Ey8dprRiSuQISAqsxUXlj4n1xuvqysPc5G/n8H8N4aXDFCZMsRQBUQK2He93iSjNbUybwsBfq5wesmkigIAoQNtu5XISSXOP371h4F+hmBqSaSaAgCQEXnDK1zOx+gZYZrmtWa/dkHBalM8QAQQkAfii631FhL6QQHJUKV461LObGSUCEpO77VT+kkiujll+bBnT1WEdLx2q+c2QEAGJAd52yg8SsfrqACa5pBnUHooxFUq6jAACMokhruvOfr19+hZmGlT61raEV400qo8q9ZDNMAEEZAIDCkvLp/Ev+BEiKis9ek2IVrUCv6bUQ9YFBBCQ45iwoDQwv4fbUTiWqTxieonG26vC3Tv+WaWHqGsIICBHWdG3uN9ut60oHEWlS88zW0PN+vamUg9ZFxFAQI4wo1jylraZHmGidys9+uGsNg3t3u3/WKmHrMsIICCHDbHdSj+JRE8O1WFuTPQPo7NGh57/lyd/1mUeYzkpCCAgRFQoVS5gluiNXNVhbsL0d3Jw3tCePVsPpfAC0i4kYHxAik7500L8rRTebA4D//dS6CHtYgJGB8R2vatIaL3aH5G/Chu1P1TrIex6AsYGxHYqnyeSW7QOMfGfN4Pqn2j10GWDgJEBKbjlr7GwenOL0M2thq8OVza2BlYZETAuILbj3UNE+h+LWK4J6zX9j2XYd5kiYFRAbMeLrh3Q/0It/JmwUU3zC32mNgcWa9ATpOB4dzOR+lt8zDTUrPtbsWnMImDEE6RQqqxllg1Kaw8IyVArqPlKPWQZJmBGQBzvfib6bFKfhOjfyeKh1q7qM0m1qM8HASMCYjte9K9/0tfW9xHRUBj4I/mwGl1oCJgSkOg22QsVgG4PA/96hQ6SnBAwIyAlbx0x6a4vY74vrFcvz4nfaCMhASMCEjEpON6/al9jF+FHWo2q5gmU0A6UdxsBYwISgbcd73+J6FeUJnxvDr/rU/X6A7ibXAkwizKjAnI4JNGXmeYrzXraGmsPjYzseFmphyxjBIwLyOGQ7NLe4yFEDXrz7yL7M+Y1lqsgYGRAIk5Fx6sKkadgFkn291g89NyuakOphywjBIwNyOEnSXQ6e3RKu+bzMgsPNRvVpzViaLJBwOiAHH6S3CFE12rsYuKDQjwUBtu3afTQdD8B4wPy5pOkfBMR36q1i1kubNZr0YEP+OSMAAJy2NCiU7lMSB5Q+ytyedio3afWQ9iVBBCQI2yxHe8TRPSdFE5dHwb+7Sn0kHYZAQTkKEN6Xe88S+gftT4x0y3Nun+zVg9ddxFAQI7jR9HtP0vE2qu3iteHQfUavR7KbiGAgEzgxMKFK98x3jP2kt4ofigMquo7RfTzQtlJAgjIJDRd9/xTfyGz/o2I3qaDLo+FQe0CnRaqbiCAgJzAhcHBwZ7nXziwX/QHWu8IAz/pl7W6YW9gDSYe+6N13Xa8HxLRYqX+2Xlz5n1o586tB5V6yGaIAJ4gCcAXnMp2JqkkkPyylJla1tis8nPPbYt+ZMMnIwQQkIRGpTxb66fM1odxuU5C6DNYjoAo4Bdc7+ssdJ1CGkleY+GP4SVHJb1pliEgSuC2691IQut0cm4TyQVh4H9Xp4dqugggIClIF5zyZUysfn8L96engD9NUgQkJeiiW/m4iOifBDgMO6UDUytHQDrAt6/k/U6b6QntULhOQUtu6nUISIcY97oD51jSfjbFcDikLgW8qZIiIB0k27uwXLB6OFQPiUPq1OimSoiAdJjsgtLA/B5uRyGZqxkah9RpqE2dBgGZAraFpeXT+BDvIqH3KIf/Xhj4H1VqIesgAQSkgzCPHKq3d/Ak6+QD/0RES5RTPB0G/nKlFrIOEUBAOgRyomFs13uchAY000SH1LUC39FooekMAQSkMxwnHcV2yxtIeK1yqv2jp5zk7Hvm7w8o9ZClIICApICXRJry/a2Xx8U6e29j+0+SzIna9AQQkPQMY49QdL0bROirsQVHFEaH1I1bdO4eHHeqwafWICBqdDphwSlfwcR369REltD5Iw3/Sa0eumQEEJBkvDpSXXC9i1joYe1guJJaSy65DgFJzqwjCtvxPklEj2kHY6I/aAb+/Vo9dPEIICDxOE1Jle1W+kmkph6c6aaw7qt+p1HPaZgQAZlhw+1F/cvIstLcw46XHKfQQwRkCuHGHdp2vD4iiv7qPi+u5i11TA+Gdf9SlRaiSQkgIF2yQYpLzj9Txmd/n0jO1C0Jh9TpuE2uQkCmgqpyzFKpcvooyTZiOls5BA6pU4KbSIaAdBho2uGWLh085cDrBx4l1r2/RUTPhoG/NO06oH+TAALSpTuhWPIeFqaLNMuLDqlr1n1bo4XmrQQQkC7eEQWnfBcTX6lc4k/DwH+XUgvZYQIISJdvBbvkrSOmG5XLfI1He97TbD7+qlJvvAwBycAWSHfJKLeJ6X1hvfpCBlrtuiUiIF1nyfEXZLveVSS0XrtcadPZrd1+dEI9PgkIICAJYM10qV2qXEIsD2rXIUReK/D1r7ZoJ86wDgHJmHm2Ux4i4r/WLluEhlsN/9tavWk6BCSDjhdLlYqwbNcuXUiubAW1e7R6k3QISEbd7nPKv90m3kZEv6ppQUS+2GrUvqLRmqRBQDLsdu/iSslqy6NEpHp/i4nubAa+9p6TDJOLv3QEJD6rrqxcsGjFe2dZ1iYhPkezQBba0Gz4F2u0JmgQkBy43Ltk4AyrLRtJZIWyHZzkOAE4BES5o7pN1tu7fK518skbiegTqrUJPRM2/PNU2hyLEJCcmZvuklHZGwa13pwhSdUOApIKX3eK7VL5XmK+XLU6kf8MG7UzVNocihCQHJoatVR0KrcJyfWa9qJD6s76rbnztm7dOq7R50mDgOTJzaN6Kbrlm0X4z7Qtzhb+jUaj+opWnwcdApIHFyfpoeB41zLRHdo2LYvOGtnl79Pqs65DQLLuYIz1p76uWmhZs+HvjDFV7koQkNxZevyGCiVvDTM9om1XhAutRnWPVp9VHQKSVecU67adgZVE7c1EdGpSefQ994OzeNn+H1R/nlSb5XoEJMvuKdZuL/aWU5uiPyi+M6ncxO+TICBJd0kO6u3SwGLi8Y1EvCBhO18OA/9LCTWZLkdAMm2ffvFFt/8sESt6ksS/ZLRNHwx3+0/pZ82eEgHJnmcdW/HChSvf0e4Z2yhEHzrhoEIvjf7fSb379pl1VyICcsKdke8C1z3/1EMyKwrJ5PeyC38mbFS/lW8ax3aHgJjm+HH6HRwc7NnzwoH1THTFcXGIrA0btU0mokJATHR9gp4LpcpaYjmXieYT8f8wyYtE7S3NYEfdVEwIiKnOo+9YBBCQWJhQZCoBBMRU59F3LAIISCxMKDKVAAJiqvPoOxYBBCQWJhSZSgABMdV59B2LAAISCxOKTCWAgJjqPPqORQABiYUJRaYSQEBMdR59xyKAgMTChCJTCSAgpjqPvmMRQEBiYUKRqQQQEFOdR9+xCCAgsTChyFQCCIipzqPvWAQQkFiYUGQqAQTEVOfRdywCCEgsTCgylQACYqrz6DsWAQQkFiYUmUoAATHVefQdiwACEgsTikwlgICY6jz6jkUAAYmFCUWmEkBATHUefccigIDEwoQiUwkgIKY6j75jEfh/2lwkBUBYu2UAAAAASUVORK5CYII=';
  // 点击返回
  const goBack = () => {
    Route.pop(1)
  }
  return (
    <>
      <StatusBar backgroundColor={bgColor} barStyle={barStyle} />
      <View style={{ height: insets.top, backgroundColor: bgColor }}></View>
      <View style={{ ...styles.container, backgroundColor: bgColor }}>
        <View style={styles.leftContainer}>
          {
            !left ?
              <TouchableOpacity onPress={goBack}>
                {
                  mode === 'black' ?
                    <Image style={styles.icon} source={{ uri: left_black }} resizeMode={'contain'}></Image>
                    :
                    <Image style={styles.icon} source={{ uri: left_white }} resizeMode={'contain'}></Image>
                }
              </TouchableOpacity> :
              <>
                {left}
              </>
          }
        </View>
        {
          typeof (title) === "string" ?
            <Text style={{ fontSize: titleSize, color: titleColor, fontWeight: '600', ...titleStyle }}>
              {StringRegular.ellipsis(title, titleLength)}
            </Text> :
            <>{title}</>
        }
        <View style={styles.rightContainer}>
          {
            !right ? <></> : <>{right}</>
          }
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Config.navBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  leftContainer: {
    height: Config.navBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 12,
    top: 0
  },
  icon: {
    width: 24,
    height: 24,
  },
  rightContainer: {
    height: Config.navBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 12,
    top: 0
  }
})
