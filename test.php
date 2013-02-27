-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2013 年 02 月 27 日 12:03
-- 服务器版本: 5.5.24-log
-- PHP 版本: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `jaguar`
--

-- --------------------------------------------------------

--
-- 表的结构 `city`
--

CREATE TABLE IF NOT EXISTS `city` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `en_name` varchar(45) DEFAULT NULL,
  `ch_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`cid`),
  UNIQUE KEY `cid_UNIQUE` (`cid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=74 ;

--
-- 转存表中的数据 `city`
--

INSERT INTO `city` (`cid`, `en_name`, `ch_name`) VALUES
(1, 'Anshan\r', '鞍山'),
(2, 'Baoding\r', '保定'),
(3, 'Baotou\r', '包头'),
(4, 'Beijing\r', '北京'),
(5, 'Changchun\r', '长春'),
(6, 'Changsha\r', '长沙'),
(7, 'Changzhou\r', '常州'),
(8, 'Chengdu\r', '成都'),
(9, 'Chongqing\r', '重庆'),
(10, 'Dalian\r', '大连'),
(11, 'Dongguan\r', '东莞'),
(12, 'Erdos\r', '鄂尔多斯'),
(13, 'Foshan\r', '佛山'),
(14, 'Fuzhou\r', '福州'),
(15, 'Guangzhou\r', '广州'),
(16, 'Guiyang\r', '贵阳'),
(17, 'Haikou\r', '海口'),
(18, 'Hangzhou\r', '杭州'),
(19, 'Harbin\r', '哈尔滨'),
(20, 'Hefei\r', '合肥'),
(21, 'Hohhot\r', '呼和浩特'),
(22, 'Hong Kong\r', '香港'),
(23, 'Huzhou\r', '湖州'),
(24, 'Jiaxing\r', '嘉兴'),
(25, 'Jinan\r', '济南'),
(26, 'Jinhua\r', '金华'),
(27, 'Kunming\r', '昆明'),
(28, 'Lanzhou\r', '兰州'),
(29, 'Linyi\r', '临沂'),
(30, 'Longyan\r', '龙岩'),
(31, 'Nanchang\r', '南昌'),
(32, 'Nanjing\r', '南京'),
(33, 'Nanning\r', '南宁'),
(34, 'Nantong\r', '南通'),
(35, 'Ningbo\r', '宁波'),
(36, 'Ningbo(Cixi)\r', '宁波(慈溪)'),
(37, 'Qingdao\r', '青岛'),
(38, 'Qinghuangdao\r', '秦皇岛'),
(39, 'Quanzhou\r', '泉州'),
(40, 'Shanghai\r', '上海'),
(41, 'Shanghai(PD)\r', '上海(浦东)'),
(42, 'Shantou\r', '汕头'),
(43, 'Shaoxing\r', '绍兴'),
(44, 'Shenyang\r', '沈阳'),
(45, 'Shenzhen\r', '深圳'),
(46, 'Shijiazhuang\r', '石家庄'),
(47, 'Suzhou\r', '苏州'),
(48, 'Taiwan\r', '台湾'),
(49, 'Taiyuan\r', '太原'),
(50, 'Taizhou\r', '台州'),
(51, 'Tangshan\r', '唐山'),
(52, 'Tianjin\r', '天津'),
(53, 'Urumqi\r', '乌鲁木齐'),
(54, 'Weifang\r', '潍坊'),
(55, 'Wenzhou\r', '温州'),
(56, 'Wuhan\r', '武汉'),
(57, 'Wuxi\r', '无锡'),
(58, 'Xiamen\r', '厦门'),
(59, 'Xi''an\r', '西安'),
(60, 'Xuzhou\r', '徐州'),
(61, 'Yangzhou\r', '扬州'),
(62, 'Yantai\r', '烟台'),
(63, 'Yichang\r', '宜昌'),
(64, 'Yinchuan\r', '银川'),
(65, 'Yingkou\r', '营口'),
(66, 'Yulin\r', '榆林'),
(67, 'Zhengjiang\r', '镇江'),
(68, 'Zhengzhou\r', '郑州'),
(69, 'Zhuhai\r', '珠海'),
(70, 'Zibo\r', '淄博'),
(71, 'Other\r', '其他');

-- --------------------------------------------------------

--
-- 表的结构 `group_one`
--

CREATE TABLE IF NOT EXISTS `group_one` (
  `gid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `field` enum('group_head','general_manager','partner') DEFAULT NULL,
  PRIMARY KEY (`gid`),
  UNIQUE KEY `gid_UNIQUE` (`gid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=169 ;

--
-- 转存表中的数据 `group_one`
--

INSERT INTO `group_one` (`gid`, `title`, `field`) VALUES
(1, 'CATC中国机械', 'group_head'),
(2, 'Nanling', 'group_head'),
(3, 'Shunbaohang', 'group_head'),
(4, '上海世贸', 'group_head'),
(5, '上海森那美', 'group_head'),
(6, '中升集团', 'group_head'),
(7, '中捷集团', 'group_head'),
(8, '中汽南方', 'group_head'),
(9, '云南中致远', 'group_head'),
(10, '佛山广顺', 'group_head'),
(11, '保定轩宇', 'group_head'),
(12, '力天集团', 'group_head'),
(13, '厦门建发集团', 'group_head'),
(14, '厦门新成功', 'group_head'),
(15, '台州国鸿', 'group_head'),
(16, '吉林盛荣', 'group_head'),
(17, '太原捷路', 'group_head'),
(18, '宁夏路捷', 'group_head'),
(19, '宁波丰颐', 'group_head'),
(20, '宝信集团', 'group_head'),
(21, '尊荣亿方', 'group_head'),
(22, '广东宏粤', 'group_head'),
(23, '庞大汽贸', 'group_head'),
(24, '惠通路华', 'group_head'),
(25, '无锡东方', 'group_head'),
(26, '武汉康顺', 'group_head'),
(27, '永达集团', 'group_head'),
(28, '江苏世贸泰信', 'group_head'),
(29, '江苏明都汽车集团', 'group_head'),
(30, '河南和谐', 'group_head'),
(31, '浙江中通', 'group_head'),
(32, '润东集团', 'group_head'),
(33, '深圳佳鸿', 'group_head'),
(34, '温州欧龙', 'group_head'),
(35, '甘肃路捷', 'group_head'),
(36, '英之杰', 'group_head'),
(37, '西上海信杰', 'group_head'),
(38, '贵州亨特惠通', 'group_head'),
(39, '路德行', 'group_head'),
(40, '运通集团', 'group_head'),
(41, '通孚祥', 'group_head'),
(42, '长久集团', 'group_head'),
(43, '青岛华泰', 'group_head'),
(44, 'ASA\r', 'general_manager'),
(45, 'BJA\r', 'general_manager'),
(46, 'BJB\r', 'general_manager'),
(47, 'BJD\r', 'general_manager'),
(48, 'BJI\r', 'general_manager'),
(49, 'BJL\r', 'general_manager'),
(50, 'BJM\r', 'general_manager'),
(51, 'BJN\r', 'general_manager'),
(52, 'CCA\r', 'general_manager'),
(53, 'CCB\r', 'general_manager'),
(54, 'CDB\r', 'general_manager'),
(55, 'CDC\r', 'general_manager'),
(56, 'CHA\r', 'general_manager'),
(57, 'CHA\r', 'general_manager'),
(58, 'CQB\r', 'general_manager'),
(59, 'CQC\r', 'general_manager'),
(60, 'CQE\r', 'general_manager'),
(61, 'CSA\r', 'general_manager'),
(62, 'CSB\r', 'general_manager'),
(63, 'CZA\r', 'general_manager'),
(64, 'CZB\r', 'general_manager'),
(65, 'DGA\r', 'general_manager'),
(66, 'DLA\r', 'general_manager'),
(67, 'DLC\r', 'general_manager'),
(68, 'FJA\r', 'general_manager'),
(69, 'FZA\r', 'general_manager'),
(70, 'FZB\r', 'general_manager'),
(71, 'GDB\r', 'general_manager'),
(72, 'GDC\r', 'general_manager'),
(73, 'GDD\r', 'general_manager'),
(74, 'GYB\r', 'general_manager'),
(75, 'GZA\r', 'general_manager'),
(76, 'GZC\r', 'general_manager'),
(77, 'GZD\r', 'general_manager'),
(78, 'GZE\r', 'general_manager'),
(79, 'GZF\r', 'general_manager'),
(80, 'HBA\r', 'general_manager'),
(81, 'HBB\r', 'general_manager'),
(82, 'HBC\r', 'general_manager'),
(83, 'HBD\r', 'general_manager'),
(84, 'HBE\r', 'general_manager'),
(85, 'HFA\r', 'general_manager'),
(86, 'HKA\r', 'general_manager'),
(87, 'HNA\r', 'general_manager'),
(88, 'HNB\r', 'general_manager'),
(89, 'HNC\r', 'general_manager'),
(90, 'HRA\r', 'general_manager'),
(91, 'HRB\r', 'general_manager'),
(92, 'HRC\r', 'general_manager'),
(93, 'HZB\r', 'general_manager'),
(94, 'HZC\r', 'general_manager'),
(95, 'HZD\r', 'general_manager'),
(96, 'HZE\r', 'general_manager'),
(97, 'HZF\r', 'general_manager'),
(98, 'JHA\r', 'general_manager'),
(99, 'JHB\r', 'general_manager'),
(100, 'JNE\r', 'general_manager'),
(101, 'JXA\r', 'general_manager'),
(102, 'KMA\r', 'general_manager'),
(103, 'KMB\r', 'general_manager'),
(104, 'LYA\r', 'general_manager'),
(105, 'LZB\r', 'general_manager'),
(106, 'MGA\r', 'general_manager'),
(107, 'MGC\r', 'general_manager'),
(108, 'MGD\r', 'general_manager'),
(109, 'MYA\r', 'general_manager'),
(110, 'NBA\r', 'general_manager'),
(111, 'NBB\r', 'general_manager'),
(112, 'NBC\r', 'general_manager'),
(113, 'NCA\r', 'general_manager'),
(114, 'NJA\r', 'general_manager'),
(115, 'NJB\r', 'general_manager'),
(116, 'NNB\r', 'general_manager'),
(117, 'NTA\r', 'general_manager'),
(118, 'QDA\r', 'general_manager'),
(119, 'QDB \r', 'general_manager'),
(120, 'QZA\r', 'general_manager'),
(121, 'QZB\r', 'general_manager'),
(122, 'SDA\r', 'general_manager'),
(123, 'SHB\r', 'general_manager'),
(124, 'SHF\r', 'general_manager'),
(125, 'SHG\r', 'general_manager'),
(126, 'SHI\r', 'general_manager'),
(127, 'SHJ\r', 'general_manager'),
(128, 'SHK\r', 'general_manager'),
(129, 'SHL\r', 'general_manager'),
(130, 'SUA\r', 'general_manager'),
(131, 'SUB\r', 'general_manager'),
(132, 'SXA\r', 'general_manager'),
(133, 'SYA\r', 'general_manager'),
(134, 'SYB\r', 'general_manager'),
(135, 'SZA\r', 'general_manager'),
(136, 'SZB\r', 'general_manager'),
(137, 'SZC\r', 'general_manager'),
(138, 'SZD\r', 'general_manager'),
(139, 'THA\r', 'general_manager'),
(140, 'TJB\r', 'general_manager'),
(141, 'TJC\r', 'general_manager'),
(142, 'TJD\r', 'general_manager'),
(143, 'TYB\r', 'general_manager'),
(144, 'TZA\r', 'general_manager'),
(145, 'TZB\r', 'general_manager'),
(146, 'WFA\r', 'general_manager'),
(147, 'WHB\r', 'general_manager'),
(148, 'WUA\r', 'general_manager'),
(149, 'WXA\r', 'general_manager'),
(150, 'WXB\r', 'general_manager'),
(151, 'WZA\r', 'general_manager'),
(152, 'WZB\r', 'general_manager'),
(153, 'WZD\r', 'general_manager'),
(154, 'XAB\r', 'general_manager'),
(155, 'XAC\r', 'general_manager'),
(156, 'XAD\r', 'general_manager'),
(157, 'XJA\r', 'general_manager'),
(158, 'XMA\r', 'general_manager'),
(159, 'XMB\r', 'general_manager'),
(160, 'XZA\r', 'general_manager'),
(161, 'YCA\r', 'general_manager'),
(162, 'YHA\r', 'general_manager'),
(163, 'YKA\r', 'general_manager'),
(164, 'YTA\r', 'general_manager'),
(165, 'YZA\r', 'general_manager'),
(166, 'ZBA\r', 'general_manager'),
(167, 'ZHA\r', 'general_manager'),
(168, 'ZJA', 'general_manager');

-- --------------------------------------------------------

--
-- 表的结构 `message`
--

CREATE TABLE IF NOT EXISTS `message` (
  `mid` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `msg` text,
  `created_ts` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`mid`),
  UNIQUE KEY `mid_UNIQUE` (`mid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `message`
--

INSERT INTO `message` (`mid`, `uid`, `msg`, `created_ts`) VALUES
(1, 3, '', '2013-02-22 04:34:28'),
(2, 4, '', '2013-02-22 09:35:14');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `uid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `last_name` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `gender` enum('m','f') CHARACTER SET latin1 DEFAULT NULL,
  `id_passport_number` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  `email` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  `password` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  `is_attending` int(1) DEFAULT '1',
  `tel` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  `mobile` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  `position` enum('group_head','manager','partner') CHARACTER SET latin1 DEFAULT NULL,
  `group_name` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  `group_title` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  `dms_code` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  `company_name` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  `company_title` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `dealership_name` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `dealership_addr` varchar(200) CHARACTER SET latin1 DEFAULT NULL,
  `dealership_region` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `arrival_date` date DEFAULT NULL,
  `arrival_transportation` enum('airplane','train','car') CHARACTER SET latin1 DEFAULT NULL,
  `arrival_from` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  `arrival_time` time DEFAULT NULL,
  `departure_date` date DEFAULT NULL,
  `departure_transportation` enum('airplane','train','car') CHARACTER SET latin1 DEFAULT NULL,
  `departure_to` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  `departure_time` time DEFAULT NULL,
  `room_type` enum('single','twin') CHARACTER SET latin1 DEFAULT NULL,
  `guest_name` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  `not_staying` int(1) DEFAULT NULL,
  `not_staying_reason` text CHARACTER SET latin1,
  `is_joining_lunch` int(1) DEFAULT NULL,
  `create_ts` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modify_ts` timestamp NULL DEFAULT NULL,
  `last_login_ts` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uid_UNIQUE` (`uid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`uid`, `first_name`, `last_name`, `gender`, `id_passport_number`, `email`, `password`, `is_attending`, `tel`, `mobile`, `position`, `group_name`, `group_title`, `dms_code`, `company_name`, `company_title`, `city_id`, `dealership_name`, `dealership_addr`, `dealership_region`, `arrival_date`, `arrival_transportation`, `arrival_from`, `arrival_time`, `departure_date`, `departure_transportation`, `departure_to`, `departure_time`, `room_type`, `guest_name`, `not_staying`, `not_staying_reason`, `is_joining_lunch`, `create_ts`, `modify_ts`, `last_login_ts`) VALUES
(1, NULL, NULL, NULL, NULL, 'dilin110@gmail.com', 'ac53cc5f88edb477217de9e40653c6b8', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2013-02-22 02:32:47'),
(2, 'Christophe', 'dd', 'f', NULL, 'dilin1102@gmail.com', 'ac53cc5f88edb477217de9e40653c6b8', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2013-02-20 11:34:49', NULL, NULL),
(5, '笛笛', '林', 'f', 'dfa151054', '19534819@qq.com', 'ac53cc5f88edb477217de9e40653c6b8', 1, '', '', 'partner', '', '', '', 'cname', 'ctitle', 9, NULL, NULL, NULL, '0000-00-00', 'airplane', '1', '02:00:00', '0000-00-00', 'airplane', '1', '01:30:00', 'single', '', 0, '', NULL, '2013-02-27 07:15:45', NULL, '2013-02-27 00:15:45');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
