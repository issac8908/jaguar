<?php
/*
 * This work is hereby released into the Public Domain.
 * To view a copy of the public domain dedication,
 * visit http://creativecommons.org/licenses/publicdomain/ or send a letter to
 * Creative Commons, 559 Nathan Abbott Way, Stanford, California 94305, USA.
 *
 */

$road = 10;
$navilandRail = 3;
$navilandRoad = 5;
if (isset($_GET['Road']) && isset($_GET['NavilandRoad']) && isset($_GET['NavilandRail']))
{
	$road = $_GET['Road'];
	$navilandRail = $_GET['NavilandRail'];
	$navilandRoad = $_GET['NavilandRoad'];
}

$maxY = $road > $navilandRail + $navilandRoad ? ($road * 1.2) : (($navilandRail + $navilandRoad) * 1.2);
require_once ('./Artichow/BarPlot.class.php');

$graph = new Graph(300, 200);
$graph->border->hide();

$group = new PlotGroup;
$group->setPadding(30, 20, 10, 10);
$group->axis->bottom->hide();
$group->axis->left->setColor(new Color(0xDE, 0xE7, 0xD1));
$group->setBackgroundColor(new Color(0xDE, 0xE7, 0xD1));
$group->setYMax($maxY);

$group->grid->hide(TRUE);

//	Road
$valuesRoad = array($road, null);
$plotRoad = new BarPlot($valuesRoad, 1, 1, 0);
$plotRoad->setBarColor(new Color(0x87, 0x86, 0x87));
$plotRoad->barBorder->setColor(new Color(0x87, 0x86, 0x87));
$plotRoad->setBarSpace(0);
$plotRoad->label->set($valuesRoad);
$plotRoad->label->setFont(new TuffyBold(28));
$plotRoad->label->setAngle(0);
$plotRoad->label->setAlign(null, Label::TOP);
$plotRoad->label->setPadding(0, 0, 0, 0);
$plotRoad->label->setColor(new Color(0x87, 0x86, 0x87));
$plotRoad->setYAxis(Plot::LEFT);
$group->add($plotRoad);

//	Naviland Rail
$valuesNaviRail = array(null, $navilandRail + $navilandRoad);
$plotNaviRail = new BarPlot($valuesNaviRail, 1, 1, 0);
$plotNaviRail->setBarColor(new Color(0x8B, 0xC5, 0x46));
$plotNaviRail->barBorder->setColor(new Color(0x8B, 0xC5, 0x46));
$plotNaviRail->setBarSpace(0);
$plotNaviRail->label->set($valuesNaviRail);
$plotNaviRail->label->setFont(new TuffyBold(28));
$plotNaviRail->label->setAngle(0);
$plotNaviRail->label->setAlign(null, Label::TOP);
$plotNaviRail->label->setPadding(0, 0, 0, 0);
$plotNaviRail->label->setColor(new Color(0x8B, 0xC5, 0x46));
$plotNaviRail->setYAxis(Plot::LEFT);
$group->add($plotNaviRail);

//	Naviland Road
$valuesNaviRoad = array(null, $navilandRoad);
$plotNaviRoad = new BarPlot($valuesNaviRoad, 1, 1, 0);
$plotNaviRoad->setBarColor(new Color(0x92, 0x2D, 0x92));
$plotNaviRoad->barBorder->setColor(new Color(0x92, 0x2D, 0x92));
$plotNaviRoad->setBarSpace(0);
$plotNaviRoad->setYAxis(Plot::LEFT);
$group->add($plotNaviRoad);

$graph->add($group);
$graph->draw();