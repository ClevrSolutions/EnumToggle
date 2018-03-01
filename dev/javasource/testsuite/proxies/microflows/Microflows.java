// This file was generated by Mendix Modeler 6.9.
//
// WARNING: Code you write here will be lost the next time you deploy the project.

package testsuite.proxies.microflows;

import java.util.HashMap;
import java.util.Map;
import com.mendix.core.Core;
import com.mendix.core.CoreException;
import com.mendix.systemwideinterfaces.MendixRuntimeException;
import com.mendix.systemwideinterfaces.core.IContext;
import com.mendix.systemwideinterfaces.core.IMendixObject;

public class Microflows
{
	// These are the microflows for the TestSuite module
	public static testsuite.proxies.Employee gET_Employee(IContext context)
	{
		try
		{
			Map<String, Object> params = new HashMap<String, Object>();
			IMendixObject result = (IMendixObject)Core.execute(context, "TestSuite.GET_Employee", params);
			return result == null ? null : testsuite.proxies.Employee.initialize(context, result);
		}
		catch (CoreException e)
		{
			throw new MendixRuntimeException(e);
		}
	}
	public static void iVK_OpenPopup(IContext context)
	{
		try
		{
			Map<String, Object> params = new HashMap<String, Object>();
			Core.execute(context, "TestSuite.IVK_OpenPopup", params);
		}
		catch (CoreException e)
		{
			throw new MendixRuntimeException(e);
		}
	}
	public static void iVK_ValidatePage(IContext context, testsuite.proxies.Employee _employee)
	{
		try
		{
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("Employee", _employee == null ? null : _employee.getMendixObject());
			Core.execute(context, "TestSuite.IVK_ValidatePage", params);
		}
		catch (CoreException e)
		{
			throw new MendixRuntimeException(e);
		}
	}
	public static boolean oC_UpdateChangeLog(IContext context, testsuite.proxies.Employee _employee)
	{
		try
		{
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("Employee", _employee == null ? null : _employee.getMendixObject());
			return (Boolean)Core.execute(context, "TestSuite.OC_UpdateChangeLog", params);
		}
		catch (CoreException e)
		{
			throw new MendixRuntimeException(e);
		}
	}
}