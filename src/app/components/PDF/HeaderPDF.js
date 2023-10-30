import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import YosLogo from '../../../assets/YosLogo.png';
// Create styles
const styles = StyleSheet.create({
  section1: {
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  section2: {
    width: '80%',
    justifyContent: 'center',
    display: 'flex',
  },
  logo: {
    width: 70,
    height: 80,
  },
  border: {
    flexDirection: 'row',
    justifyContent: 'center',
    lineHeight: 1.3,
    borderBottomWidth: '3px',
    height: '100px',
    marginBottom: 10,
    marginTop: 20,
  },
});

// Create Document Component
const HeaderPDF = () => (
  <View style={styles.border}>
    <View style={styles.section1}>
      <Image
        style={styles.logo}
        src={YosLogo}
      />
    </View>
    <View style={styles.section2}>
      <View>
        <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'left' }}>
          SMA YOS SUDARSO - METRO
        </Text>
        <Text style={{ fontSize: 8, textAlign: 'left' }}>
          YPKLD - KANTOR OPERASIONAL WILAYAH - LAMPUNG
        </Text>
        <Text style={{ fontSize: 8, textAlign: 'left' }}>
          Jl. Koi No.25 RT/RW 27/07 Yosorejo, Metro Timur, Kota Metro 34113
          Lampung Indonesia
        </Text>
      </View>
      {/* <Text style={{ fontWeight: 'bold', fontSize: 8, textAlign: 'left' }}>
        STATUS TERAKREDITASI "A" NPSN: 10807562
      </Text>
      <Text style={{ fontSize: 8, textAlign: 'left' }}>
        AKTA NOTARIS NO. 72 TANGGAL 30 MEI 2015 NDS: L 02014003 - NSS:
        302126104012
      </Text>
    
      <Text style={{ fontSize: 8, textAlign: 'left' }}>
        Telp/Fax:(0725) 42726 Email: smayosmetro@yahoo.co.id
      </Text> */}
    </View>
  </View>
);

export default HeaderPDF;
